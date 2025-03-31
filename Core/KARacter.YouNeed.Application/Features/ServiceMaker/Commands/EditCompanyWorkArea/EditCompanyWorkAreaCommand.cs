using KARacter.YouNeed.Application.Common.Models;
using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyWorkArea;

public record EditCompanyWorkAreaCommand : IRequest<CommandResponse>
{
    public required Guid Id { get; init; }
    public required Guid CompanyId { get; init; }
    public required string City { get; init; }
    public required string PostalCode { get; init; }
    public required string District { get; init; }
    public decimal? RadiusInKm { get; init; }
    public bool IsActive { get; init; }
    public string? AdditionalInfo { get; init; }
} 