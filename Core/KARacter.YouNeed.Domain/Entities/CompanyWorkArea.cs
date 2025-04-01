using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record CompanyWorkArea : AuditableEntity
    {
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
        public Guid? UserId { get; set; }
        public User User { get; set; }
        public required string City { get; set; }
        public required string PostalCode { get; set; }
        public required string District { get; set; }
        public decimal? RadiusInKm { get; set; }
        public bool IsActive { get; set; } = true;
        public string? AdditionalInfo { get; set; } // JSON z dodatkowymi informacjami o obszarze
    }
} 