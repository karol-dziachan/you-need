using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record Company : AuditableEntity
    {
        public required string Name { get; set; }
        public required string NIP { get; set; }
        public string REGON { get; set; }
        public required string Address { get; set; }
        public required string City { get; set; }
        public required string PostalCode { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;

        public CompanyBreakSettings BreakSettings { get; set; }
        public List<CompanyUser> CompanyUsers { get; set; }
        public List<CompanyWorkArea> WorkAreas { get; set; }
        public List<CompanyWorkSchedule> WorkSchedules { get; set; }
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
        public ICollection<PaymentMethod> PaymentMethods { get; set; } = new List<PaymentMethod>();
    }
} 