using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record CompanyUser : AuditableEntity
    {
        public required Guid CompanyId { get; init; }
        public required Company Company { get; init; }
        public required Guid UserId { get; init; }
        public required User User { get; init; }
        public required Guid UserRoleId { get; init; }
        public required UserRole UserRole { get; init; }
        public bool IsActive { get; init; } = true;
        public DateTime? StartDate { get; init; }
        public DateTime? EndDate { get; init; }
        public string? Position { get; init; }
        public string? Department { get; init; }
       
    }
} 