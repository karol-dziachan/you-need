using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.RegisterServiceMaker;

public class RegisterServiceProviderCommand : IRequest<RegisterServiceProviderCommandResult>
{
    public required string CompanyName { get; init; }
    public required string NIP { get; init; }
    public string REGON { get; init; }
    public required string Email { get; init; }
    public string? Website { get; init; }
    public string? Description { get; init; }
    public string? PhoneNumber { get; init; }
    public required string Address { get; init; }
    public required string City { get; init; }
    public required string PostalCode { get; init; }
    public required string Password { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required ICollection<WorkAreaDto> WorkAreas { get; init; } = new List<WorkAreaDto>();

    public record WorkAreaDto
    {
        public required string City { get; init; }
        public required string PostalCode { get; init; }
        public required string District { get; init; }
        public required int RadiusInKm { get; init; }
        public string? AdditionalInfo { get; init; }
    }
}
