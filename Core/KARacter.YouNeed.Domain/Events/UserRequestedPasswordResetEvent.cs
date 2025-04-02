
namespace KARacter.YouNeed.Domain.Events;

public class UserRequestedPasswordResetEvent
{
    public required string Email { get; init; }
    public string Token { get; init; }
    public string BaseUrl { get; init; }
}