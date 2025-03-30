using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KARacter.YouNeed.Persistence.Configurations;

public class DomainEventConfiguration : IEntityTypeConfiguration<DomainEvent>
{
    public void Configure(EntityTypeBuilder<DomainEvent> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.CreatedDateTime).IsRequired();
        builder.Property(e => e.HandledDateTime);
        builder.Property(e => e.IsHandled).IsRequired();
        builder.Property(e => e.EventType).HasMaxLength(256);
        builder.Property(e => e.EventData);
        builder.Property(e => e.EventSource).HasMaxLength(256);
        builder.Property(e => e.EventResult);
        builder.Property(e => e.EventError);
        builder.Property(e => e.RetryCount).IsRequired();
    }
}