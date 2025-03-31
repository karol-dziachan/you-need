// EditCompanyWorkScheduleCommandResult.cs
namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyWorkSchedule;

public record EditCompanyWorkScheduleCommandResult
{
    public bool IsSuccess { get; init; }
    public string Message { get; init; }
}
