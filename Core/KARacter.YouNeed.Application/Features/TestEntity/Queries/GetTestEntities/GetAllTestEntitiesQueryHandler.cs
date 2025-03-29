using KARacter.YouNeed.Persistence.Abstractions;
using MediatR;

namespace KARacter.YouNeed.Application.Features.TestEntity.Queries.GetTestEntities
{
    public class GetAllTestEntitiesQueryHandler : IRequestHandler<GetAllTestEntitiesQuery, GetAllTestEntitiesQueryResult>
    {
        private readonly ITestEntityRepository _repository; 

        public GetAllTestEntitiesQueryHandler(ITestEntityRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public async Task<GetAllTestEntitiesQueryResult> Handle(GetAllTestEntitiesQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var entities = await _repository.GetAllAsync(cancellationToken);

                var data = entities.Select(e => new TestEntityDto
                {
                    Id = e.Id,
                    FirstName = e.FirstName,
                    LastName = e.LastName
                }).ToList();

                return new GetAllTestEntitiesQueryResult(true, "Entities retrieved successfully", data);
            }
            catch (Exception ex)
            {
                return new GetAllTestEntitiesQueryResult(false, $"Error retrieving entities: {ex.Message}", Enumerable.Empty<TestEntityDto>());
            }
        }
    }
}
