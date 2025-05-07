using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyWorkArea;

public record AddCompanyWorkAreaCommand : IRequest<CommandResponse>
{
    public required Guid CompanyId { get; init; }
    public Guid? UserId { get; init; }
    public required string City { get; init; }
    public required string PostalCode { get; init; }
    public required string District { get; init; }
    public decimal? RadiusInKm { get; init; }
    public string? AdditionalInfo { get; init; }
} 