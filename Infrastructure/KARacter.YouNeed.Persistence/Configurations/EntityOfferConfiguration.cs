using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KARacter.YouNeed.Persistence.Configurations;

public class EntityOfferConfiguration : IEntityTypeConfiguration<EntityOffer>
{
    public void Configure(EntityTypeBuilder<EntityOffer> builder)
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.WhichEntity)
            .IsRequired()
            .HasMaxLength(10);

        builder.HasCheckConstraint("CK_EntityOffer_WhichEntity", "WhichEntity IN ('Company', 'Worker')");

        builder.Property(e => e.EntityId)
            .IsRequired();

        builder.Property(e => e.TimeToCompleteInMinutes)
            .IsRequired();

        builder.Property(e => e.Price)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.Property(e => e.Currency)
            .IsRequired(false)
            .HasMaxLength(3);

        builder.Property(e => e.UnitOfMeasure)
            .IsRequired(false)
            .HasMaxLength(255);

        builder.Property(e => e.IsActive)
            .IsRequired();

        builder.HasOne(e => e.Offer)
            .WithMany(o => o.EntityOffers)
            .HasForeignKey(e => e.OfferId);
    }   
}