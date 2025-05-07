using MediatR;

namespace KARacter.YouNeed.Application.Features.Login.Queries.Login;

public class LoginQuery : IRequest<LoginQueryResult>
{
    public required string Email { get; init; }
    public required string Password { get; init; }
}