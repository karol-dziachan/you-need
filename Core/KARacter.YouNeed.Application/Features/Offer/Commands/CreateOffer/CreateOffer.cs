using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.Offer.Commands.CreateOffer;

public class CreateOfferCommand : IRequest<CreateOfferCommandResult>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string PathToImage { get; set; }
    public bool IsHead { get; set; }
    public bool IsParentOffer { get; set; }
    public Guid? ParentOfferId { get; set; }
    public bool IsAddedByUser { get; set; }
}

public class CreateOfferCommandResult
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
    public Guid Id { get; set; }
}

public class CreateOfferCommandHandler : IRequestHandler<CreateOfferCommand, CreateOfferCommandResult>  
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<CreateOfferCommandHandler> _logger;

    public CreateOfferCommandHandler(IYouNeedDbContext context, ILogger<CreateOfferCommandHandler> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<CreateOfferCommandResult> Handle(CreateOfferCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Creating offer {Name}", request.Name);

        try
        {
            var existingOffer = await _context.Offers.FirstOrDefaultAsync(o => o.Name == request.Name, cancellationToken);
            if (existingOffer != null)
            {
                _logger.LogWarning("Offer {Name} already exists", request.Name);
                return new CreateOfferCommandResult { IsSuccess = false, Message = "Oferta o podanej nazwie już istnieje" };
            }

            var offer = new Domain.Entities.Offer
            {
                Name = request.Name,
                Description = request.Description,
                PathToImage = request.PathToImage,
                IsHead = request.IsHead,
                IsParentOffer = request.IsParentOffer,
                ParentOfferId = request.ParentOfferId,
                IsAddedByUser = request.IsAddedByUser,
                IsActive = true
            };

            _logger.LogInformation("Adding offer {Name} to database", request.Name);

            _context.Offers.Add(offer);
            await _context.SaveChangesAsync(cancellationToken);
            
            _logger.LogInformation("Offer {Name} added to database", request.Name);

            return new CreateOfferCommandResult { IsSuccess = true, Message = "Oferta została utworzona pomyślnie", Id = offer.Id };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating offer {Name}", request.Name);
            return new CreateOfferCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas tworzenia oferty" };
        }
    }
}