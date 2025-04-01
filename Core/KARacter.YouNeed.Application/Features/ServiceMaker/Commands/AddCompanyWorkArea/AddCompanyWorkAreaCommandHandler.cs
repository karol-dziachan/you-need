using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyWorkArea;

public class AddCompanyWorkAreaCommandHandler : IRequestHandler<AddCompanyWorkAreaCommand, CommandResponse>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<AddCompanyWorkAreaCommandHandler> _logger;

    public AddCompanyWorkAreaCommandHandler(
        IYouNeedDbContext context,
        ILogger<AddCompanyWorkAreaCommandHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<CommandResponse> Handle(AddCompanyWorkAreaCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Rozpoczęto dodawanie nowego obszaru roboczego dla firmy: {CompanyId}", request.CompanyId);

            var company = await _context.Companies
                .FindAsync(new object[] { request.CompanyId }, cancellationToken);

            if (company is null)
            {
                _logger.LogWarning("Nie znaleziono firmy o ID: {CompanyId}", request.CompanyId);
                return new CommandResponse
                {
                    IsSuccess = false,
                    Message = "Nie znaleziono firmy o podanym identyfikatorze."
                };
            }

            var workArea = new CompanyWorkArea
            {
                CompanyId = request.CompanyId,
                UserId = request.UserId,
                City = request.City,
                PostalCode = request.PostalCode,
                District = request.District,
                RadiusInKm = request.RadiusInKm,
                IsActive = true,
                AdditionalInfo = request.AdditionalInfo
            };

            await _context.CompanyWorkAreas.AddAsync(workArea, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Pomyślnie dodano nowy obszar roboczy dla firmy: {CompanyId}", request.CompanyId);

            return new CommandResponse
            {
                IsSuccess = true,
                Message = "Pomyślnie dodano nowy obszar roboczy."
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Wystąpił błąd podczas dodawania obszaru roboczego dla firmy: {CompanyId}", request.CompanyId);
            return new CommandResponse
            {
                IsSuccess = false,
                Message = "Wystąpił błąd podczas dodawania obszaru roboczego."
            };
        }
    }
} 