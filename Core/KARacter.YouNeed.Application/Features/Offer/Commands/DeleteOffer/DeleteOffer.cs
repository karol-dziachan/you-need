using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.Offer.Commands.DeleteOffer;

public class DeleteOfferCommand : IRequest<DeleteOfferCommandResult>
{
    public Guid Id { get; set; }
}

public class DeleteOfferCommandResult
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
}

public class DeleteOfferCommandHandler : IRequestHandler<DeleteOfferCommand, DeleteOfferCommandResult>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<DeleteOfferCommandHandler> _logger;

    public DeleteOfferCommandHandler(IYouNeedDbContext context, ILogger<DeleteOfferCommandHandler> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<DeleteOfferCommandResult> Handle(DeleteOfferCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Deleting offer {Id}", request.Id);

            var offer = await _context.Offers.AsNoTracking().FirstOrDefaultAsync(o => o.Id == request.Id, cancellationToken);
            if (offer is null)
            {
                _logger.LogWarning("Offer {Id} not found", request.Id);
                return new DeleteOfferCommandResult { IsSuccess = false, Message = "Oferta o podanym ID nie została znaleziona" };
            }

            _logger.LogInformation("Offer {Id} found", request.Id);

            offer.IsActive = false;

            _context.Offers.Update(offer);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Offer {Id} deleted", request.Id);
            return new DeleteOfferCommandResult { IsSuccess = true, Message = "Oferta została usunięta pomyślnie" };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting offer {Id}", request.Id);
            return new DeleteOfferCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas usuwania oferty" };
        }
    }
}
