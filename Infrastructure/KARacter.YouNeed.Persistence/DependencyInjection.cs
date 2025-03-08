using KARacter.YouNeed.Persistence.Abstractions;
using KARacter.YouNeed.Persistence.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KARacter.YouNeed.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddScoped<ITestEntityRepository>(provider => new TestEntityRepository(connectionString));
            return services;
        }
    }
}
