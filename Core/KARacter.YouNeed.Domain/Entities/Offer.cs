using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities;

public record Offer : AuditableEntity
{
    public string Name { get; set; }
    public string PathToImage { get; set; }
    public string Description { get; set; }
    public bool IsHead { get; set; }

    public bool IsActive { get; set; }
    public bool IsParentOffer { get; set; }
    public Guid? ParentOfferId { get; set; }
    public bool IsAddedByUser { get; set; }

    public ICollection<EntityOffer> EntityOffers { get; set; } = new List<EntityOffer>();

}
