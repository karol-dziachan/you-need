using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Common.Shared;
using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Events;
using KARacter.YouNeed.EventProcessor.Services.Interfaces;
using Newtonsoft.Json;

namespace KARacter.YouNeed.EventProcessor.Services.Handlers;

public class UserDeactivatedEventHandler : IEventHandler
{
    private readonly IEmailService _emailService;
    private readonly ILogger<ServiceProviderRegisteredEventHandler> _logger;

    public UserDeactivatedEventHandler(
        IEmailService emailService,
        ILogger<ServiceProviderRegisteredEventHandler> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }

    public async Task HandleAsync(DomainEvent @event, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Processing ServiceProviderRegisteredEvent: {EventId}", @event.Id);

            var eventData = JsonConvert.DeserializeObject<UserDeactivatedEvent>(@event.EventData);
            if (eventData is null)
            {
                throw new InvalidOperationException("Failed to deserialize event data");
            }

            var emailBody = EmailTemplates.DeactivationEmail(eventData.CompanyName);
            await _emailService.SendEmailAsync(
                eventData.Email,
                "Dezaktywacja konta w YouNeed",
                emailBody);

            _logger.LogInformation("Successfully processed ServiceProviderRegisteredEvent: {EventId}", @event.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing ServiceProviderRegisteredEvent: {EventId}", @event.Id);
            throw;
        }
    }
}