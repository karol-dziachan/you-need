using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.UpdateContactInfo;

public class UpdateContactInfoCommand : IRequest<UpdateContactInfoCommandResult>
{
    public required Guid CompanyId { get; init; }
    public string CompanyName { get; init; }
    public string CompanyNIP { get; init; }
    public string CompanyREGON { get; init; }
    public string CompanyDescription { get; init; }
    public string CompanyAddress { get; init; }
    public string CompanyCity { get; init; }
    public string CompanyPostalCode { get; init; }
    public string CompanyPhoneNumber { get; init; }
    public string CompanyWebsite { get; init; }
}