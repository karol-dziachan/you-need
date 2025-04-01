using KARacter.YouNeed.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyWorkArea;

public class DeleteCompanyWorkAreaCommandHandler : IRequestHandler<DeleteCompanyWorkAreaCommand, CommandResponse>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<DeleteCompanyWorkAreaCommandHandler> _logger;

    public DeleteCompanyWorkAreaCommandHandler(
        IYouNeedDbContext context,
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