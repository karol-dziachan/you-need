using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyUser;

public class DeleteCompanyUserCommand : IRequest<DeleteCompanyUserCommandResult>
{
    public required Guid CompanyId { get; set; }
    public required Guid UserId { get; set; }
}