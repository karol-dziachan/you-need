using KARacter.YouNeed.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KARacter.YouNeed.Persistence.Configurations;

public class CompanyWorkScheduleConfiguration : IEntityTypeConfiguration<CompanyWorkSchedule>
{
    public void Configure(EntityTypeBuilder<CompanyWorkSchedule> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.CompanyId)
            .IsRequired();

        builder.Property(x => x.DayOfWeek)
            .IsRequired();

        builder.Property(x => x.StartTime)
            .IsRequired();

        builder.Property(x => x.EndTime)
            .IsRequired();

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(x => x.IsBreakTime)
            .IsRequired();

        builder.Property(x => x.BreakStartTime);

        builder.Property(x => x.BreakEndTime);

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

        builder.HasOne(x => x.Company)
            .WithMany()
            .HasForeignKey(x => x.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}