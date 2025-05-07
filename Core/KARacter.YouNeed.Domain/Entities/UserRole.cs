using KARacter.YouNeed.Domain.Common;
using KARacter.YouNeed.Domain.Enums;

namespace KARacter.YouNeed.Domain.Entities
{
    public record UserRole : AuditableEntity
    {
        public required string Name { get; init; }
        public required string Description { get; init; }
        public bool IsActive { get; init; } = true;

        public List<CompanyUser> CompanyUsers { get; init; }
    }
} 