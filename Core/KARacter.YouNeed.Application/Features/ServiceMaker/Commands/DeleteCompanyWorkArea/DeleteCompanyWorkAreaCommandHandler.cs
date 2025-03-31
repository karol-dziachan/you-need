using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Application.Common.Models;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyWorkArea;

public class DeleteCompanyWorkAreaCommandHandler : IRequestHandler<DeleteCompanyWorkAreaCommand, CommandResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteCompanyWorkAreaCommandHandler> _logger;

    public DeleteCompanyWorkAreaCommandHandler(
        IApplicationDbContext context,
        ILogger<DeleteCompanyWorkAreaCommandHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<CommandResponse> Handle(DeleteCompanyWorkAreaCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Rozpoczęto usuwanie obszaru roboczego: {Id} dla firmy: {CompanyId}", 
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

            // Sprawdzenie czy obszar nie jest używany w aktywnych zleceniach
            var hasActiveOrders = await _context.ServiceOrders
                .AnyAsync(x => x.CompanyWorkAreaId == request.Id && x.Status != Domain.Enums.ServiceOrderStatus.Completed,
                    cancellationToken);

            if (hasActiveOrders)
            {
                _logger.LogWarning("Nie można usunąć obszaru roboczego: {Id}, ponieważ jest używany w aktywnych zleceniach", 
                    request.Id);
                return new CommandResponse
                {
                    IsSuccess = false,
                    Message = "Nie można usunąć obszaru roboczego, ponieważ jest używany w aktywnych zleceniach."
                };
            }

            _context.CompanyWorkAreas.Remove(workArea);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Pomyślnie usunięto obszar roboczy: {Id} dla firmy: {CompanyId}", 
                request.Id, request.CompanyId);

            return new CommandResponse
            {
                IsSuccess = true,
                Message = "Pomyślnie usunięto obszar roboczy."
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Wystąpił błąd podczas usuwania obszaru roboczego: {Id} dla firmy: {CompanyId}", 
                request.Id, request.CompanyId);
            return new CommandResponse
            {
                IsSuccess = false,
                Message = "Wystąpił błąd podczas usuwania obszaru roboczego."
            };
        }
    }
} 