using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Queries.DashboardData;

public class GetDashboardDataQuery : IRequest<GetDashboardDataQueryResult>
{
    public string JwtToken { get; set; }
}
