using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Queries.GetCompanyWorkAreas;

public record GetCompanyWorkAreasQuery : IRequest<GetCompanyWorkAreasResponse>
{
    public required Guid CompanyId { get; init; }
    public bool? IsActive { get; init; }
} 