using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Application.Common.Models;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyWorkArea;

public class EditCompanyWorkAreaCommandHandler : IRequestHandler<EditCompanyWorkAreaCommand, CommandResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<EditCompanyWorkAreaCommandHandler> _logger;

    public EditCompanyWorkAreaCommandHandler(
        IApplicationDbContext context,
        ILogger<EditCompanyWorkAreaCommandHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<CommandResponse> Handle(EditCompanyWorkAreaCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Rozpoczęto edycję obszaru roboczego: {Id} dla firmy: {CompanyId}", 
                request.Id, request.CompanyId);

            var workArea = await _context.CompanyWorkAreas
                .FirstOrDefaultAsync(x => x.Id == request.Id && x.CompanyId == request.CompanyId, 
                    cancellationToken);

            if (workArea is null)
            {
                _logger.LogWarning("Nie znaleziono obszaru roboczego o ID: {Id} dla firmy: {CompanyId}", 
                    request.Id, request.CompanyId);
                return new CommandResponse
                {
                    IsSuccess = false,
                    Message = "Nie znaleziono obszaru roboczego o podanym identyfikatorze."
                };
            }

            var updatedWorkArea = workArea with
            {
                City = request.City,
                PostalCode = request.PostalCode,
                District = request.District,
                RadiusInKm = request.RadiusInKm,
                IsActive = request.IsActive,
                AdditionalInfo = request.AdditionalInfo
            };

            _context.CompanyWorkAreas.Update(updatedWorkArea);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Pomyślnie zaktualizowano obszar roboczy: {Id} dla firmy: {CompanyId}", 
                request.Id, request.CompanyId);

            return new CommandResponse
            {
                IsSuccess = true,
                Message = "Pomyślnie zaktualizowano obszar roboczy."
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Wystąpił błąd podczas aktualizacji obszaru roboczego: {Id} dla firmy: {CompanyId}", 
                request.Id, request.CompanyId);
            return new CommandResponse
            {
                IsSuccess = false,
                Message = "Wystąpił błąd podczas aktualizacji obszaru roboczego."
            };
        }
    }
} 