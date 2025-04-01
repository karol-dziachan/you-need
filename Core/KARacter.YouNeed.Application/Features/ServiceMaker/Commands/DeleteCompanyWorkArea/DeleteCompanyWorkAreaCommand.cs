using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyWorkArea;

public record DeleteCompanyWorkAreaCommand : IRequest<CommandResponse>
{
    public required Guid Id { get; init; }
    public required Guid CompanyId { get; init; }
} 