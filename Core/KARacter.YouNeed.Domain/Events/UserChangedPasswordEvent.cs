namespace KARacter.YouNeed.Domain.Events;

public class UserChangedPasswordEvent
{
    public Guid Id { get; init; }
    public required string Email { get; init; }
}