using KARacter.YouNeed.EventProcessor.Services.Handlers;
using KARacter.YouNeed.EventProcessor.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace KARacter.YouNeed.EventProcessor.Services;

public class EventHandlerFactory : IEventHandlerFactory
{
    private readonly IServiceProvider _serviceProvider;

    public EventHandlerFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public IEventHandler? GetHandler(string eventType)
    {
        return eventType switch
        {
            "ServiceProviderRegisteredEvent" => _serviceProvider.GetRequiredService<ServiceProviderRegisteredEventHandler>(),
            "UserDeactivatedEvent" => _serviceProvider.GetRequiredService<UserDeactivatedEventHandler>(),
            "UserRequestedPasswordResetEvent" => _serviceProvider.GetRequiredService<UserRequestedPasswordResetEventHandler>(),
            "UserChangedPasswordEvent" => _serviceProvider.GetRequiredService<UserChangedPasswordEventHandler>(),
            _ => null
        };
    }
} 