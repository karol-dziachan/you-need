using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.Offer.Queries.GetAllOffers;

public class GetAllOffersQuery : IRequest<GetAllOffersQueryResult>
{
    public bool IsActive { get; set; }
}

public class GetAllOffersQueryResult
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
    public List<OfferDto> Offers { get; set; }
}

public class OfferDto
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


public class GetAllOffersQueryHandler : IRequestHandler<GetAllOffersQuery, GetAllOffersQueryResult>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<GetAllOffersQueryHandler> _logger;

    public GetAllOffersQueryHandler(IYouNeedDbContext context, ILogger<GetAllOffersQueryHandler> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<GetAllOffersQueryResult> Handle(GetAllOffersQuery request, CancellationToken cancellationToken)
    {
        _logger.LogTrace("Getting all offers");

        try
        {
            var offers = await _context.Offers.ToListAsync(cancellationToken);

            var offerDtos = offers.Select(o => new OfferDto()
            {
                Id = o.Id,
                Name = o.Name,
                Description = o.Description,
                IsActive = o.IsActive,
                IsHead = o.IsHead,
                IsParentOffer = o.IsParentOffer,
                ParentOfferId = o.ParentOfferId,
                IsAddedByUser = o.IsAddedByUser,
                PathToImage = o.PathToImage,
            });

            return new GetAllOffersQueryResult() { IsSuccess = true, Message = "Oferty zostały pobrane pomyślnie", Offers = offerDtos.ToList() };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all offers");
            return new GetAllOffersQueryResult() { IsSuccess = false, Message = "Nie udało się pobrać ofert" };
        }
    }
    
    
}
    

