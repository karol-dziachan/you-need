using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Persistence.ContextCreator;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Persistence
{
    public static class DependencyInjection
    {
                /*
          root@karacter-type:/opt/source/you-need/Infrastructure/KARacter.YouNeed.Persistence/ContextCreator# dotnet ef migrations add Init --startup-project ../../../Presentation/KARacter.YouNeed.Api/
          root@karacter-type:/opt/source/you-need/Infrastructure/KARacter.YouNeed.Persistence/ContextCreator# dotnet ef database update --startup-project ../../../Presentation/KARacter.YouNeed.Api/
        */

        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<YouNeedDbContext>(options => 
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"), 
                    b => b.MigrationsAssembly("KARacter.YouNeed.Api")
                )
                .UseLoggerFactory(LoggerFactory.Create(builder => builder.SetMinimumLevel(LogLevel.Warning)))
            );

            services.AddScoped<IYouNeedDbContext, YouNeedDbContext>();
        
            return services;
        }
    }
}
