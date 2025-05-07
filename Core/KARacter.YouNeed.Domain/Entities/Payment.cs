using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record Payment : AuditableEntity
    {
        public ICollection<Company> Companies { get; init; }
        public required Guid PaymentMethodId { get; init; }
        public required PaymentMethod PaymentMethod { get; init; }
        public required decimal Amount { get; init; }
        public required string Currency { get; init; }
        public required string Status { get; init; }
        public string? TransactionId { get; init; }
        public string? PaymentReference { get; init; }
        public string? Description { get; init; }
        public string? ErrorMessage { get; init; }
        public string? PaymentDetails { get; init; } // JSON z dodatkowymi szczegółami płatności
        public DateTime? PaymentDate { get; init; }
        public DateTime? ExpirationDate { get; init; }
        public string? CustomerEmail { get; init; }
        public string? CustomerName { get; init; }
        public string? CustomerPhone { get; init; }
        public string? CustomerAddress { get; init; }
        public string? CustomerCity { get; init; }
        public string? CustomerPostalCode { get; init; }
        public string? CustomerCountry { get; init; }
    }
} 