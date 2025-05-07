using KARacter.YouNeed.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KARacter.YouNeed.Persistence.Configurations;

public class PaymentMethodConfiguration : IEntityTypeConfiguration<PaymentMethod>
{
    public void Configure(EntityTypeBuilder<PaymentMethod> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Description)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Code)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(x => x.IsDefault)
            .IsRequired();

        builder.Property(x => x.IconUrl)
            .HasMaxLength(1000);

        builder.Property(x => x.IntegrationConfig)
            .HasMaxLength(4000);

        builder.HasMany(x => x.Companies)
            .WithMany(x => x.PaymentMethods);

        builder.HasMany(x => x.Payments)
            .WithOne(x => x.PaymentMethod)
            .HasForeignKey("PaymentMethodId")
            .OnDelete(DeleteBehavior.Restrict);
    }
}