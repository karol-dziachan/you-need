namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyWorkArea;

public record CommandResponse
{
    public bool IsSuccess { get; init; }
    public string Message { get; init; }
}