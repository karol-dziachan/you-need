using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyUser;

public class AddCompanyUserCommand : IRequest<AddCompanyUserCommandResult>
{
    public required Guid CompanyId { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string PhoneNumber { get; set; }
    public string UserRole { get; set; }
}

