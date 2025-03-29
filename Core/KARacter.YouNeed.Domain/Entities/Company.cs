using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record Company : AuditableEntity
    {
        public required string Name { get; init; }
        public required string NIP { get; init; }
        public string REGON { get; init; }
        public required string Address { get; init; }
        public required string City { get; init; }
        public required string PostalCode { get; init; }
        public string? PhoneNumber { get; init; }
        public string? Email { get; init; }
        public string? Website { get; init; }
        public string? Description { get; init; }
        public bool IsActive { get; init; } = true;

        public CompanyBreakSettings BreakSettings { get; init; }
        public List<CompanyUser> CompanyUsers { get; init; }
        public List<CompanyWorkArea> WorkAreas { get; init; }
        public List<CompanyWorkSchedule> WorkSchedules { get; init; }
        public ICollection<Payment> Payments { get; init; } = new List<Payment>();
        public ICollection<PaymentMethod> PaymentMethods { get; init; } = new List<PaymentMethod>();
    }
} 