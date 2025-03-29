using KARacter.YouNeed.Persistence.Abstractions;
using Dapper;
using Microsoft.Data.SqlClient;
using KARacter.YouNeed.Domain.Entites;

namespace KARacter.YouNeed.Persistence.Repositories
{
    internal class TestEntityRepository : ITestEntityRepository
    {
        private readonly string _connectionString;

        public TestEntityRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<Guid> AddAsync(TestEntity entity, CancellationToken cancellationToken)
        {
            ArgumentNullException.ThrowIfNull(entity);

            const string sql = @"
                        INSERT INTO [dbo].TestEntity (Id, FirstName, LastName)
                        OUTPUT INSERTED.ID 
                        VALUES (@Id, @FirstName, @LastName);";

            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync(cancellationToken);

            using var transaction = await connection.BeginTransactionAsync(cancellationToken);

            try
            {
                var parameters = new { Id = Guid.NewGuid(), entity.FirstName, entity.LastName };
                var insertedId = await connection.ExecuteScalarAsync<Guid>(sql, parameters, transaction: transaction);

                await transaction.CommitAsync(cancellationToken);
                return insertedId;
            }
            catch
            {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }

        public async Task<IEnumerable<TestEntity>> GetAllAsync(CancellationToken cancellationToken)
        {
            const string sql = @"
                        SELECT Id, FirstName, LastName 
                        FROM [dbo].TestEntity;";

            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync(cancellationToken);

            return await connection.QueryAsync<TestEntity>(sql);
        }

    }
}
