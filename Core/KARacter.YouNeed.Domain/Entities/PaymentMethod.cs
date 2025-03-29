using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record PaymentMethod : AuditableEntity
    {
        public required string Name { get; init; }
        public required string Description { get; init; }
        public required string Code { get; init; }
        public bool IsActive { get; init; } = true;
        public bool IsDefault { get; init; }
        public string? IconUrl { get; init; }
        public string? IntegrationConfig { get; init; } // JSON z konfiguracją integracji

        public List<Company> Companies { get; init; }
        public List<Payment> Payments { get; init; }
    }
} 