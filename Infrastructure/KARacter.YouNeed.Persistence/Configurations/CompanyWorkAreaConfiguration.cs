using KARacter.YouNeed.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KARacter.YouNeed.Persistence.Configurations;

public class CompanyWorkAreaConfiguration : IEntityTypeConfiguration<CompanyWorkArea>
{
    public void Configure(EntityTypeBuilder<CompanyWorkArea> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.CompanyId)
            .IsRequired();

        builder.Property(x => x.City)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.PostalCode)
            .IsRequired()
            .HasMaxLength(10);

        builder.Property(x => x.District)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.RadiusInKm)
            .HasPrecision(8, 2);

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(x => x.AdditionalInfo)
            .HasMaxLength(4000);

        builder.HasOne(x => x.Company)
            .WithMany()
            .HasForeignKey(x => x.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}