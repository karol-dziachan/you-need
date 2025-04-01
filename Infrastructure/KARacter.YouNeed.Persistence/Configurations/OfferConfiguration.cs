using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KARacter.YouNeed.Persistence.Configurations;

public class OfferConfiguration : IEntityTypeConfiguration<Offer>
{
    public void Configure(EntityTypeBuilder<Offer> builder)
    {
        builder.ToTable("Offer");
        
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Name)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(e => e.Description)
            .IsRequired()
            .HasMaxLength(2500);

        builder.Property(e => e.PathToImage)
            .IsRequired(false)
            .HasMaxLength(255);

        builder.Property(e => e.IsActive)
            .IsRequired();

        builder.Property(e => e.IsParentOffer)
            .IsRequired();

        builder.Property(e => e.IsAddedByUser)
            .IsRequired();
         
        builder.HasMany(e => e.EntityOffers)
            .WithOne(e => e.Offer)
            .HasForeignKey(e => e.OfferId);
    }
}