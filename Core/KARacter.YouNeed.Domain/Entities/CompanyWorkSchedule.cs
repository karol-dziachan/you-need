using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record CompanyWorkSchedule : AuditableEntity
    {
        public required Guid CompanyId { get; init; }
        public required Company Company { get; init; }
        public required Guid UserId { get; init; }
        public required CompanyUser User { get; init; }
        public required DayOfWeek DayOfWeek { get; init; }
        public required TimeSpan StartTime { get; init; }
        public required TimeSpan EndTime { get; init; }
        public bool IsActive { get; init; } = true;
        public bool IsBreakTime { get; init; }
        public TimeSpan? BreakStartTime { get; init; }
        public TimeSpan? BreakEndTime { get; init; }
        public string? Notes { get; init; }
    }
} 