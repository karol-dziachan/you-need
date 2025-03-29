using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record CompanyWorkArea : AuditableEntity
    {
        public required Guid CompanyId { get; init; }
        public required Company Company { get; init; }
        public required string City { get; init; }
        public required string PostalCode { get; init; }
        public required string District { get; init; }
        public decimal? RadiusInKm { get; init; }
        public bool IsActive { get; init; } = true;
        public string? AdditionalInfo { get; init; } // JSON z dodatkowymi informacjami o obszarze
    }
} 