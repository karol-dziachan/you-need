using KARacter.YouNeed.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyWorkArea;

public class EditCompanyWorkAreaCommandHandler : IRequestHandler<EditCompanyWorkAreaCommand, CommandResponse>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<EditCompanyWorkAreaCommandHandler> _logger;

    public EditCompanyWorkAreaCommandHandler(
        IYouNeedDbContext context,
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
                .AsNoTracking()
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

            workArea = workArea with
            {
                City = request.City,
                PostalCode = request.PostalCode,
                District = request.District,
                RadiusInKm = request.RadiusInKm,
                IsActive = request.IsActive,
                AdditionalInfo = request.AdditionalInfo
            };

            _context.Entry(workArea).State = EntityState.Modified;
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