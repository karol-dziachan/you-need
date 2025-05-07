using MediatR;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.ActivateServiceMakerAcoount;

public class ActivateServiceMakerAcoountCommand : IRequest<ActivateServiceMakerAcoountCommandResult>
{
    public Guid Id { get; set; }
}