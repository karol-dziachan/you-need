namespace KARacter.YouNeed.Application.Features.Login.Queries.Login;

public class LoginQueryResult
{
    public required bool IsSuccess { get; init; }
    public required string Message { get; init; }
    public string Token { get; init; }
}
