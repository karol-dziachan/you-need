using KARacter.YouNeed.Domain.Entities;

namespace KARacter.YouNeed.EventProcessor.Services.Interfaces;

public interface IEventHandler
{
    Task HandleAsync(DomainEvent @event, CancellationToken cancellationToken);
} 