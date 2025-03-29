using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record User : AuditableEntity
    {
        public required string Email { get; init; }
        public required string PasswordHash { get; init; }
        public required string FirstName { get; init; }
        public required string LastName { get; init; }
        public string? PhoneNumber { get; init; }
        public bool IsActive { get; init; } = true;
        public bool IsEmailConfirmed { get; init; }
        public DateTime? LastLoginDate { get; init; }
        public string? RefreshToken { get; init; }
        public DateTime? RefreshTokenExpiryTime { get; init; }

        public CompanyUser CompanyUser { get; init; }
    }
}
