using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyWorkSchedule;

public record DeleteCompanyWorkScheduleCommand : IRequest<DeleteCompanyWorkScheduleCommandResult>
{
    public required Guid Id { get; init; }
    public required Guid CompanyId { get; init; }
}