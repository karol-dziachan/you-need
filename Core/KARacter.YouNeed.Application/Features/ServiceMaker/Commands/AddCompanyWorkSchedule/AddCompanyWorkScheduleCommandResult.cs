namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyWorkSchedule;

public record AddCompanyWorkScheduleCommandResult
{
    public bool IsSuccess { get; init; }
    public string Message { get; init; }
    public Guid Id { get; init; }
}