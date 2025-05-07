using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Domain.Entities
{
    public record User : AuditableEntity
    {
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsEmailConfirmed { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }

        public CompanyUser CompanyUser { get; set; }
        public ICollection<CompanyWorkArea> CompanyWorkAreas { get; set; }
        public ICollection<CompanyBreakSettings> CompanyBreakSettings { get; set; }
    }
}
