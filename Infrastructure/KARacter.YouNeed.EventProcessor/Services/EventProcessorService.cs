using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.EventProcessor.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.EventProcessor.Services;

public class EventProcessorService : BackgroundService
{
    private readonly ILogger<EventProcessorService> _logger;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IEventHandlerFactory _eventHandlerFactory;
    private readonly PeriodicTimer _timer;

    public EventProcessorService(
        ILogger<EventProcessorService> logger,
        IServiceScopeFactory scopeFactory,
        IEventHandlerFactory eventHandlerFactory)
    {
        _logger = logger;
        _scopeFactory = scopeFactory;
        _eventHandlerFactory = eventHandlerFactory;
        _timer = new PeriodicTimer(TimeSpan.FromSeconds(10));
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Event Processor Service is starting...");

        try
        {
            while (await _timer.WaitForNextTickAsync(stoppingToken))
            {
                await ProcessPendingEvents(stoppingToken);
            }
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("Event Processor Service is stopping...");
        }
    }

    private async Task ProcessPendingEvents(CancellationToken cancellationToken)
    {
        try
        {
            using var scope = _scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<IYouNeedDbContext>();

            var pendingEvents = await dbContext.DomainEvents
                .Where(e => !e.IsHandled && e.RetryCount < 10)
                .OrderBy(e => e.CreatedDateTime)
                .Take(10)
                .ToListAsync(cancellationToken);

            if (!pendingEvents.Any())
            {
                return;
            }

            _logger.LogInformation("Found {Count} pending events to process", pendingEvents.Count);

            foreach (var @event in pendingEvents)
            {
                try
                {
                    var handler = _eventHandlerFactory.GetHandler(@event.EventType);
                    if (handler is null)
                    {
                        _logger.LogWarning("No handler found for event type: {EventType}", @event.EventType);
                        continue;
                    }

                    await handler.HandleAsync(@event, cancellationToken);

                    @event.IsHandled = true;
                    @event.HandledDateTime = DateTime.Now;
                    @event.EventResult = "Success";
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error processing event {EventId} of type {EventType}", 
                        @event.Id, @event.EventType);
                    @event.RetryCount++;
                    @event.EventResult = "Failed";
                    @event.EventError = ex.Message;
                }
            }

            await dbContext.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in ProcessPendingEvents");
        }
    }
} 