using KARacter.YouNeed.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KARacter.YouNeed.Persistence.Configurations;

public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
{
    public void Configure(EntityTypeBuilder<Payment> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.PaymentMethod)
            .WithMany(x => x.Payments)
            .HasForeignKey("PaymentMethodId")
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(x => x.Amount)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.Property(x => x.Currency)
            .IsRequired()
            .HasMaxLength(3);

        builder.Property(x => x.Status)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.TransactionId)
            .HasMaxLength(100);

        builder.Property(x => x.PaymentReference) 
            .HasMaxLength(100);

        builder.Property(x => x.Description)
            .HasMaxLength(500);

        builder.Property(x => x.ErrorMessage)
            .HasMaxLength(1000);

        builder.Property(x => x.PaymentDetails)
            .HasMaxLength(4000);

        builder.Property(x => x.CustomerEmail)
            .HasMaxLength(256);

        builder.Property(x => x.CustomerName)
            .HasMaxLength(200);

        builder.Property(x => x.CustomerPhone)
            .HasMaxLength(20);

        builder.Property(x => x.CustomerAddress)
            .HasMaxLength(500);

        builder.Property(x => x.CustomerCity)
            .HasMaxLength(100);

        builder.Property(x => x.CustomerPostalCode)
            .HasMaxLength(10);

        builder.Property(x => x.CustomerCountry)
            .HasMaxLength(100);

        builder.HasMany(x => x.Companies)
            .WithMany(x => x.Payments);
    }
}