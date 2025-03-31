using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyWorkSchedule;

public record AddCompanyWorkScheduleCommand : IRequest<AddCompanyWorkScheduleCommandResult>
{
    public required Guid CompanyId { get; init; }
    public required Guid UserId { get; init; }
    public required DayOfWeek DayOfWeek { get; init; }
    public required TimeSpan StartTime { get; init; }
    public required TimeSpan EndTime { get; init; }
    public bool IsBreakTime { get; init; }
    public TimeSpan? BreakStartTime { get; init; }
    public TimeSpan? BreakEndTime { get; init; }
    public string? Notes { get; init; }
}