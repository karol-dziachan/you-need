using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.EntityOffer.Commands.DeleteEntityOffer;

public class DeleteEntityOfferCommand : IRequest<DeleteEntityOfferCommandResult>
{
    public Guid Id { get; set; }
}

public class DeleteEntityOfferCommandResult
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
}


public class DeleteEntityOfferCommandHandler : IRequestHandler<DeleteEntityOfferCommand, DeleteEntityOfferCommandResult>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<DeleteEntityOfferCommandHandler> _logger;

    public DeleteEntityOfferCommandHandler(IYouNeedDbContext context, ILogger<DeleteEntityOfferCommandHandler> logger)
    {
        _context = context;
        _logger = logger;
    }
    public async Task<DeleteEntityOfferCommandResult> Handle(DeleteEntityOfferCommand request, CancellationToken cancellationToken)
    {
        _logger.LogTrace("Deleting entity offer. With data: {@Request}", request);
        try
        {
            using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
            try
            {
                var entityOffer = await _context.EntityOffers
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (entityOffer == null)
                {
                    _logger.LogError("Entity offer not found. With id: {@Id}", request.Id);
                    return new DeleteEntityOfferCommandResult { IsSuccess = false, Message = "Oferta nie znaleziona" };
                }

                entityOffer.IsActive = false;
                await _context.SaveChangesAsync(cancellationToken);

                await transaction.CommitAsync(cancellationToken);
                return new DeleteEntityOfferCommandResult { IsSuccess = true, Message = "Oferta została usunięta pomyślnie" };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting entity offer");
                return new DeleteEntityOfferCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas usuwania oferty" };
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting entity offer");
            return new DeleteEntityOfferCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas usuwania oferty" };
        }
    }
}