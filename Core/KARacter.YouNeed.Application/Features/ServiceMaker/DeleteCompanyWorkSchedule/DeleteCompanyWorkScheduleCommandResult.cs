namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyWorkSchedule;

public record DeleteCompanyWorkScheduleCommandResult
{
    public bool IsSuccess { get; init; }
    public string Message { get; init; }
}