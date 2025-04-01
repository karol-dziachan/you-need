using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record CompanyBreakSettings : AuditableEntity
    {
        public required Guid CompanyId { get; set; }
        public Company Company { get; set; }
        public required Guid UserId { get; set; }
        public User User { get; set; }

        public required int MinimumBreakBetweenOrdersInMinutes { get; set; }
        public required int MaximumOrdersPerDay { get; set; }
        public bool IsActive { get; set; } = true;
        public bool AllowWeekendOrders { get; set; }
        public bool AllowHolidayOrders { get; set; }
        public string? ExcludedDates { get; set; } // JSON z listą wykluczonych dat
        public string? SpecialBreakRules { get; set; } // JSON z dodatkowymi regułami przerw
    }
} 