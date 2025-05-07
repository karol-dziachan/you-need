namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyWorkArea;

public record CommandResponse
{
    public bool IsSuccess { get; init; }
    public string Message { get; init; }
}