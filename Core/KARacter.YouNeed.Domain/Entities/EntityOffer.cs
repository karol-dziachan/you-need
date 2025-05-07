using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities;

public record EntityOffer : AuditableEntity
{
    public required string WhichEntity { get; set; }
    public required Guid EntityId { get; set; }

    
    public int TimeToCompleteInMinutes { get; set; }
    public double Price { get; set; }
    public string? Currency { get; set; }
    public string? UnitOfMeasure { get; set; }
    public bool IsActive { get; set; }

    public required Guid OfferId { get; set; }
    public Offer Offer { get; set; }
}
