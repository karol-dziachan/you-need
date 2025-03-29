using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KARacter.YouNeed.Persistence.Configurations;

public class CompanyUserConfiguration : IEntityTypeConfiguration<CompanyUser>
{
    public void Configure(EntityTypeBuilder<CompanyUser> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.CompanyId)
            .IsRequired();

        builder.Property(x => x.UserId)
            .IsRequired();

        builder.Property(x => x.UserRoleId)
            .IsRequired();

        builder.HasOne(x => x.UserRole)
            .WithMany(x => x.CompanyUsers)
            .HasForeignKey(x => x.UserRoleId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(x => x.StartDate);
        
        builder.Property(x => x.EndDate);

        builder.Property(x => x.Position)
            .HasMaxLength(100);

        builder.Property(x => x.Department)
            .HasMaxLength(100);

        builder.HasOne(x => x.Company)
            .WithMany()
            .HasForeignKey(x => x.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Restrict);



        builder.HasOne(x => x.Company)
            .WithMany(x => x.CompanyUsers)
            .HasForeignKey(x => x.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);



    }
}
