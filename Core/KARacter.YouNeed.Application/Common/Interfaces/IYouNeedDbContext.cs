using KARacter.YouNeed.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace KARacter.YouNeed.Application.Common.Interfaces;

public interface IYouNeedDbContext
{
    #region DbSets
    DbSet<Company> Companies { get; }
    DbSet<CompanyBreakSettings> CompanyBreakSettings { get; }
    DbSet<CompanyUser> CompanyUsers { get; }
    DbSet<CompanyWorkArea> CompanyWorkAreas { get; }
    DbSet<CompanyWorkSchedule> CompanyWorkSchedules { get; }
    DbSet<DomainEvent> DomainEvents { get; }
    DbSet<Payment> Payments { get; }
    DbSet<PaymentMethod> PaymentMethods { get; }
    DbSet<User> Users { get; }
    DbSet<UserRole> UserRoles { get; }
    #endregion

    #region Entries
    DatabaseFacade Database { get; }
    EntityEntry Entry(object entity);
    EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
    #endregion

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
