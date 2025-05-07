using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Events;
using KARacter.YouNeed.EventProcessor.Services.Interfaces;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Common.Shared;

namespace KARacter.YouNeed.EventProcessor.Services.Handlers;

public class ServiceProviderRegisteredEventHandler : IEventHandler
{
    private readonly IEmailService _emailService;
    private readonly ILogger<ServiceProviderRegisteredEventHandler> _logger;

    public ServiceProviderRegisteredEventHandler(
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

            var eventData = JsonConvert.DeserializeObject<ServiceProviderRegisteredEvent>(@event.EventData);
            if (eventData is null)
            {
                throw new InvalidOperationException("Failed to deserialize event data");
            }

            var emailBody = EmailTemplates.ActivationEmail(eventData.ActivationLink, eventData.CompanyName);
            await _emailService.SendEmailAsync(
                eventData.Email,
                "Witamy w YouNeed - Aktywacja konta usługodawcy",
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