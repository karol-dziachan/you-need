using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.ActivateCompanyUser;

public record ActivateCompanyUserCommand : IRequest<ActivateCompanyUserCommandResult>
{
    public required Guid CompanyId { get; init; }
    public required Guid UserId { get; init; }
}