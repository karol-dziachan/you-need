using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace KARacter.YouNeed.Persistence.ContextCreator;

public static class Seeder
{
    public static void SeedData(this ModelBuilder modelBuilder)
    {
        var userRoles = new List<UserRole>
        {
            new UserRole { Id = Guid.NewGuid(), Name = UserRoleEnum.Admin.ToString(), Description = "Administrator", IsActive = true },
            new UserRole { Id = Guid.NewGuid(), Name = UserRoleEnum.CompanyAdmin.ToString(), Description = "Administrator firmy", IsActive = true },
            new UserRole { Id = Guid.NewGuid(), Name = UserRoleEnum.CompanyEmployee.ToString(), Description = "Pracownik firmy", IsActive = true },
            new UserRole { Id = Guid.NewGuid(), Name = UserRoleEnum.Customer.ToString(), Description = "Klient", IsActive = true },
        };

        modelBuilder.Entity<UserRole>().HasData(userRoles);
        
        
    }
}
