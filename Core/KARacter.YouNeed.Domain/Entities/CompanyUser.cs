using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record CompanyUser : AuditableEntity
    {
        public required Guid CompanyId { get; set; }
        public required Company Company { get; set; }
        public required Guid UserId { get; set; }
        public required User User { get; set; }
        public required Guid UserRoleId { get; set; }
        public required UserRole UserRole { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Position { get; set; }
        public string? Department { get; set; }

        public ICollection<CompanyWorkSchedule> WorkSchedules { get; set; } = new List<CompanyWorkSchedule>();
       
    }
} 