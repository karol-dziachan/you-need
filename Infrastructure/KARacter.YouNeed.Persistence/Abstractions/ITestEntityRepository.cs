using KARacter.YouNeed.Domain.Entites;

namespace KARacter.YouNeed.Persistence.Abstractions
{
    public interface ITestEntityRepository
    {
        Task<IEnumerable<TestEntity>> GetAllAsync(CancellationToken cancellationToken);
        Task<Guid> AddAsync(TestEntity entity, CancellationToken cancellationToken);
    }
}
