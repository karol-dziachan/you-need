using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Events;
using KARacter.YouNeed.EventProcessor.Services.Interfaces;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Common.Shared;

namespace KARacter.YouNeed.EventProcessor.Services.Handlers;

public class UserChangedPasswordEventHandler : IEventHandler
{
    private readonly IEmailService _emailService;
    private readonly ILogger<UserChangedPasswordEventHandler> _logger;

    public UserChangedPasswordEventHandler(
        IEmailService emailService,
        ILogger<UserChangedPasswordEventHandler> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }

    public async Task HandleAsync(DomainEvent @event, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Processing UserChangedPasswordEvent: {EventId}", @event.Id);

            var eventData = JsonConvert.DeserializeObject<UserChangedPasswordEvent>(@event.EventData);
            if (eventData is null)
            {
                throw new InvalidOperationException("Failed to deserialize event data");
            }

            var emailBody = EmailTemplates.PasswordChangedEmail("YouNeed");
            await _emailService.SendEmailAsync(
                eventData.Email,
                "Zmiana hasła w YouNeed",
                emailBody);

            _logger.LogInformation("Successfully processed UserChangedPasswordEvent: {EventId}", @event.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing UserChangedPasswordEvent: {EventId}", @event.Id);
            throw;
        }
    }
} 