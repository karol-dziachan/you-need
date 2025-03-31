using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Common.Options;
using KARacter.YouNeed.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyUser;

public class AddCompanyUserCommandHandler : IRequestHandler<AddCompanyUserCommand, AddCompanyUserCommandResult>
{
    private readonly IYouNeedDbContext _dbContext;
    private readonly ILogger<AddCompanyUserCommandHandler> _logger;
    private readonly IOptions<EmailSettingsOptions> _appSettings;

    public AddCompanyUserCommandHandler(IYouNeedDbContext dbContext, ILogger<AddCompanyUserCommandHandler> logger, IOptions<EmailSettingsOptions> appSettings)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _appSettings = appSettings ?? throw new ArgumentNullException(nameof(appSettings));
    }
    public async Task<AddCompanyUserCommandResult> Handle(AddCompanyUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Adding user to company {CompanyId}", request.CompanyId);

            using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                var company = await _dbContext.Companies.FindAsync(request.CompanyId);
                if (company == null)
                {
                    _logger.LogError("Company not found");
                    return new AddCompanyUserCommandResult { IsSuccess = false, Message = "Company not found" };
                }
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (user != null)
                {
                    _logger.LogError("User already exists");
                    return new AddCompanyUserCommandResult { IsSuccess = false, Message = "User already exists" };
                }

                var userRole = await _dbContext.UserRoles.FirstOrDefaultAsync(ur => ur.Name == request.UserRole);
                if (userRole == null)
                {
                    _logger.LogError("User role not found");
                    return new AddCompanyUserCommandResult { IsSuccess = false, Message = "User role not found" };
                }

                var newUser = new User
                {
                    Email = request.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    PhoneNumber = request.PhoneNumber,
                    IsActive = true,
                    IsEmailConfirmed = false,
                };
                
                _dbContext.Users.Add(newUser);
                await _dbContext.SaveChangesAsync(cancellationToken);

                var companyUser = new CompanyUser
                {
                    CompanyId = request.CompanyId,
                    Company = company,
                    UserId = newUser.Id,
                    User = newUser,
                    UserRoleId = userRole.Id,
                    UserRole = userRole,
                    IsActive = true,
                    StartDate = DateTime.UtcNow,
                    EndDate = null,
                    Position = null,
                    Department = null,
                };

                _dbContext.CompanyUsers.Add(companyUser);
                await _dbContext.SaveChangesAsync(cancellationToken);

                var domainEvent = new DomainEvent
                {
                    IsHandled = false,
                    EventType = "ServiceProviderRegisteredEvent",
                    EventData = JsonConvert.SerializeObject(new { Email = request.Email, CompanyName = company.Name, ActivationLink = _appSettings.Value.FrontendBaseUrl + "/activation/" + newUser.Id}),
                    RetryCount = 0
                };

                _dbContext.DomainEvents.Add(domainEvent);
                await _dbContext.SaveChangesAsync(cancellationToken);

                await transaction.CommitAsync(cancellationToken);

                return new AddCompanyUserCommandResult { IsSuccess = true, Message = "User added successfully" };
            }
            catch
            {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding user to company");
            return new AddCompanyUserCommandResult { IsSuccess = false, Message = "Error adding user to company" };
        }
    }
}