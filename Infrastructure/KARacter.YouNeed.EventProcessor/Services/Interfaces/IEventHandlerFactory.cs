namespace KARacter.YouNeed.EventProcessor.Services.Interfaces;

public interface IEventHandlerFactory
{
    IEventHandler? GetHandler(string eventType);
} 