using KARacter.YouNeed.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KARacter.YouNeed.Persistence.Configurations;

public class CompanyBreakSettingsConfiguration : IEntityTypeConfiguration<CompanyBreakSettings>
{
    public void Configure(EntityTypeBuilder<CompanyBreakSettings> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.CompanyId)
            .IsRequired();

        builder.Property(x => x.MinimumBreakBetweenOrdersInMinutes)
            .IsRequired();

        builder.Property(x => x.MaximumOrdersPerDay)
            .IsRequired();

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(x => x.AllowWeekendOrders)
            .IsRequired();

        builder.Property(x => x.AllowHolidayOrders)
            .IsRequired();

        builder.Property(x => x.ExcludedDates)
            .HasMaxLength(4000);

        builder.Property(x => x.SpecialBreakRules)
            .HasMaxLength(4000);

        builder.HasOne(x => x.Company)
            .WithMany()
            .HasForeignKey(x => x.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);
    }

}
