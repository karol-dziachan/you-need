using System.Reflection;
using Microsoft.EntityFrameworkCore;
using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Common;

namespace KARacter.YouNeed.Persistence.ContextCreator;

public class YouNeedDbContext : DbContext, Application.Common.Interfaces.IYouNeedDbContext
{
        #region IYouNeedDbContext
        public DbSet<Company> Companies { get; set; }
        public DbSet<CompanyBreakSettings> CompanyBreakSettings { get; set; }
        public DbSet<CompanyUser> CompanyUsers { get; set; }
        public DbSet<CompanyWorkArea> CompanyWorkAreas { get; set; }
        public DbSet<CompanyWorkSchedule> CompanyWorkSchedules { get; set; }
        public DbSet<DomainEvent> DomainEvents { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<EntityOffer> EntityOffers { get; set; }
        #endregion

        public YouNeedDbContext(DbContextOptions<YouNeedDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
           // modelBuilder.SeedData();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedDateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Europe/Warsaw"));
                        break;  
                    case EntityState.Modified:
                        entry.Entity.ModifiedDateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Europe/Warsaw"));
                        break;
                }
            }
            
            return base.SaveChangesAsync(cancellationToken);
        }
}
