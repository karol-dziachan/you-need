using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.Offer.Commands.EditOffer;

public class EditOfferCommand : IRequest<EditOfferCommandResult>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string PathToImage { get; set; }
    public string Description { get; set; }
    public bool IsHead { get; set; }

    public bool IsActive { get; set; }
    public bool IsParentOffer { get; set; }
    public Guid? ParentOfferId { get; set; }
    public bool IsAddedByUser { get; set; }
}

public class EditOfferCommandResult
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
}

public class EditOfferCommandHandler : IRequestHandler<EditOfferCommand, EditOfferCommandResult>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<EditOfferCommandHandler> _logger;

    public EditOfferCommandHandler(IYouNeedDbContext context, ILogger<EditOfferCommandHandler> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<EditOfferCommandResult> Handle(EditOfferCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Editing offer {Id}", request.Id);

            var offer = await _context.Offers.FindAsync(request.Id, cancellationToken);
            if (offer == null)
            {
                _logger.LogWarning("Offer {Id} not found", request.Id);
                return new EditOfferCommandResult { IsSuccess = false, Message = "Oferta o podanym ID nie została znaleziona" };
            }

            _logger.LogInformation("Offer {Id} found", request.Id);

            offer.Name = request.Name;
            offer.Description = request.Description;
            offer.PathToImage = request.PathToImage;
            offer.IsHead = request.IsHead;
            offer.IsActive = request.IsActive;
            offer.IsParentOffer = request.IsParentOffer;
            offer.ParentOfferId = request.ParentOfferId;
            offer.IsAddedByUser = request.IsAddedByUser;

            _logger.LogDebug("Offer {Id} updating", request.Id);

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogDebug("Offer {Id} saved", request.Id);

            _logger.LogInformation("Offer {Id} updated", request.Id);
            return new EditOfferCommandResult { IsSuccess = true, Message = "Oferta została zaktualizowana pomyślnie" };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error editing offer {Id}", request.Id);
            return new EditOfferCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas edycji oferty" };
        }
    }
}

