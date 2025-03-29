using KARacter.YouNeed.Application.Common.Abstractions;

namespace KARacter.YouNeed.Application.Features.TestEntity.Queries.GetTestEntities
{
    public class GetAllTestEntitiesQueryResult : BaseResult
    {
        public IEnumerable<TestEntityDto> Data { get; init; }

        public GetAllTestEntitiesQueryResult(bool success, string message, IEnumerable<TestEntityDto> data) : base(success, message)
        {
            Data = data; 
        }
    }

    public class TestEntityDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
