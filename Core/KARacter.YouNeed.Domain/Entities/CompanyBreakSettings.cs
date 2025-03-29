using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record CompanyBreakSettings : AuditableEntity
    {
        public required Guid CompanyId { get; init; }
        public required Company Company { get; init; }
        public required int MinimumBreakBetweenOrdersInMinutes { get; init; }
        public required int MaximumOrdersPerDay { get; init; }
        public bool IsActive { get; init; } = true;
        public bool AllowWeekendOrders { get; init; }
        public bool AllowHolidayOrders { get; init; }
        public string? ExcludedDates { get; init; } // JSON z listą wykluczonych dat
        public string? SpecialBreakRules { get; init; } // JSON z dodatkowymi regułami przerw
    }
} 