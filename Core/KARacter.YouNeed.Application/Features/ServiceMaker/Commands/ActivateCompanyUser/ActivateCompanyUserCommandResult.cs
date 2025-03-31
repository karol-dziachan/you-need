namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.ActivateCompanyUser;

public record ActivateCompanyUserCommandResult
{
    public bool IsSuccess { get; init; }
    public string Message { get; init; }
}
