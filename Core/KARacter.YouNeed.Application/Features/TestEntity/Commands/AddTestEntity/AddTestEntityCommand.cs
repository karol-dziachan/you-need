using MediatR;

namespace KARacter.YouNeed.Application.Features.TestEntity.Commands.AddTestEntity
{
    public class AddTestEntityCommand : IRequest<AddTestEntityCommandResult>
    {
        public Domain.Entites.TestEntity Entity { get; init; }
    }
}
