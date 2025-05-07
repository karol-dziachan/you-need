using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyUser;

public class EditCompanyUserCommand : IRequest<EditCompanyUserCommandResult>
{
    public required Guid CompanyId { get; set; }
    public required Guid UserId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string PhoneNumber { get; set; }
    public string UserRole { get; set; }
}