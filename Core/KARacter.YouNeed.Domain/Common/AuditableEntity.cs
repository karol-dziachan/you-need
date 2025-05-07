namespace KARacter.YouNeed.Domain.Common
{
    public abstract record AuditableEntity
    {
        public Guid Id { get; init; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime? ModifiedDateTime { get; set; }
    }
}
