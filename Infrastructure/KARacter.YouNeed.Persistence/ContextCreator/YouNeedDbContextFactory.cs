using Microsoft.EntityFrameworkCore;

namespace KARacter.YouNeed.Persistence.ContextCreator;

public class YouNeedDbContextFactory : DesignTimeDbContextFactoryBase<YouNeedDbContext>
{
    protected override YouNeedDbContext CreateNewInstance(DbContextOptions<YouNeedDbContext> options)
    {
        return new YouNeedDbContext(options);
    }
}