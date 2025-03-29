using System.Reflection;
using Microsoft.EntityFrameworkCore;
using KARacter.YouNeed.Application.Common.Interfaces;

namespace KARacter.YouNeed.Persistence.ContextCreator;

public class YouNeedDbContext : DbContext, Application.Common.Interfaces.IYouNeedDbContext
{
        #region IYouNeedDbContext


        #endregion

        public YouNeedDbContext(DbContextOptions<YouNeedDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            
            //modelBuilder.SeedData();
        }
}
