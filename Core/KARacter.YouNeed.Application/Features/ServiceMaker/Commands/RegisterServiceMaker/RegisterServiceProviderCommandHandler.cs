using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Enums;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using BCrypt.Net;
using Microsoft.Extensions.Options;
using KARacter.YouNeed.Common.Options;
using Microsoft.EntityFrameworkCore;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.RegisterServiceMaker;

public class RegisterServiceProviderCommandHandler : IRequestHandler<RegisterServiceProviderCommand, RegisterServiceProviderCommandResult>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<RegisterServiceProviderCommandHandler> _logger;
    private readonly IOptions<EmailSettingsOptions> _appSettings;

    public RegisterServiceProviderCommandHandler(IYouNeedDbContext context, IOptions<EmailSettingsOptions> appSettings, ILogger<RegisterServiceProviderCommandHandler> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _appSettings = appSettings ?? throw new ArgumentNullException(nameof(appSettings));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<RegisterServiceProviderCommandResult> Handle(RegisterServiceProviderCommand request, CancellationToken cancellationToken)
    {
        _logger.LogTrace("RegisterServiceProviderCommandHandler: Handle, Request: {@Request}", request);

        try
        {
            await ValidateIfDataIsUnique(request, cancellationToken);   
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Błąd podczas walidacji danych unikalnych: {Message}, Request: {@Request}", ex.Message, request);
            return new RegisterServiceProviderCommandResult
            {
                Message = "Podane dane są już zajęte. Sprawdź adres email, NIP oraz REGON.",
                IsSuccess = false
            };
        }

        using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

        try
        {
            var user = new User
            {
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                FirstName = request.FirstName,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
                IsActive = true,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync(cancellationToken); // Żeby mieć `user.Id`

            var company = new Company
            {
                Name = request.CompanyName,
                NIP = request.NIP,
                REGON = request.REGON,
                Address = request.Address,
                City = request.City,
                PostalCode = request.PostalCode,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                Website = request.Website,
                Description = request.Description,
                IsActive = true
            };

            _context.Companies.Add(company);
            await _context.SaveChangesAsync(cancellationToken);

            var workAreas = request.WorkAreas.Select(x => new CompanyWorkArea
            {
                CompanyId = company.Id,
                City = x.City,
                PostalCode = x.PostalCode,
                District = x.District,
                RadiusInKm = x.RadiusInKm
            }).ToList();

            _context.CompanyWorkAreas.AddRange(workAreas);
            await _context.SaveChangesAsync(cancellationToken);

            var userRole = _context.UserRoles.FirstOrDefault(x => x.Name == UserRoleEnum.CompanyAdmin.ToString());
            if (userRole is null)
            {
                await transaction.RollbackAsync(cancellationToken);
                _logger.LogError("Nie znaleziono roli CompanyAdmin w bazie danych");
                return new RegisterServiceProviderCommandResult
                {
                    Message = "Wystąpił błąd podczas rejestracji. Skontaktuj się z administratorem.",
                    IsSuccess = false
                };
            }

            var companyUser = new CompanyUser
            {
                CompanyId = company.Id,
                Company = company,
                UserId = user.Id,
                User = user,
                UserRoleId = userRole.Id,
                UserRole = userRole,
                IsActive = true,
            };

            _context.CompanyUsers.Add(companyUser);

            var domainEvent = new DomainEvent
            {
                IsHandled = false,
                EventType = "ServiceProviderRegisteredEvent",
                EventData = JsonConvert.SerializeObject(new { Email = request.Email, CompanyName = request.CompanyName, ActivationLink = _appSettings.Value.FrontendBaseUrl + "/activation/" + user.Id}),
                RetryCount = 0
            };

            _context.DomainEvents.Add(domainEvent);

            await _context.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            return new RegisterServiceProviderCommandResult
            {
                Message = "Firma została zarejestrowana pomyślnie",
                IsSuccess = true,
                Id = company.Id
            };
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(cancellationToken);
            _logger.LogError(ex, "Błąd podczas rejestracji usługodawcy: {Message}, Request: {@Request}", ex.Message, request);
            return new RegisterServiceProviderCommandResult
            {
                Message = "Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.",
                IsSuccess = false
            };
        }
    }

    private async Task ValidateIfDataIsUnique(RegisterServiceProviderCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == request.Email, cancellationToken);

        if (user is not null)
        {
            throw new Exception("Email jest już zajęty");
        }

        var company = await _context.Companies
            .FirstOrDefaultAsync(x => x.NIP == request.NIP || x.REGON == request.REGON || x.Name == request.CompanyName, cancellationToken);

        if (company is not null)
        {
            if (company.NIP == request.NIP)
            {
                throw new Exception("NIP jest już zajęty");
            }
            if (company.REGON == request.REGON)
            {
                throw new Exception("REGON jest już zajęty"); 
            }
            if (company.Name == request.CompanyName)
            {
                throw new Exception("Nazwa firmy jest już zajęta");
            }
        }
    }
}
