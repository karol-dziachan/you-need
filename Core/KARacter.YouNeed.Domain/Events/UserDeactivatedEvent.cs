namespace KARacter.YouNeed.Domain.Events;

public class UserDeactivatedEvent
{
    public Guid Id { get; init; }
    public required string Email { get; init; }
    public required string CompanyName { get; init; }
}