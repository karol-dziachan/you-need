using KARacter.YouNeed.Persistence.Abstractions;
using MediatR;

namespace KARacter.YouNeed.Application.Features.TestEntity.Commands.AddTestEntity
{
    public class AddTestEntityCommandHandler : IRequestHandler<AddTestEntityCommand, AddTestEntityCommandResult>
    {
        private readonly ITestEntityRepository _repository;

        public AddTestEntityCommandHandler(ITestEntityRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public async Task<AddTestEntityCommandResult> Handle(AddTestEntityCommand request, CancellationToken cancellationToken)
        {
            var newEntityId = await _repository.AddAsync(request.Entity, cancellationToken);

            if (newEntityId == Guid.Empty)
            {
                return new AddTestEntityCommandResult(false, "Failed to add entity.", null);
            }

            return new AddTestEntityCommandResult(true, "Entity added successfully.", newEntityId);
        }
    }
}
