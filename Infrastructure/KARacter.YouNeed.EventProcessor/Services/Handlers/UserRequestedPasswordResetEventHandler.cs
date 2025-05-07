using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Common.Shared;
using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Events;
using KARacter.YouNeed.EventProcessor.Services.Interfaces;
using Newtonsoft.Json;

namespace KARacter.YouNeed.EventProcessor.Services.Handlers;

public class UserRequestedPasswordResetEventHandler : IEventHandler
{
    private readonly IEmailService _emailService;
    private readonly ILogger<UserRequestedPasswordResetEventHandler> _logger;

    public UserRequestedPasswordResetEventHandler(
        IEmailService emailService,
        ILogger<UserRequestedPasswordResetEventHandler> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }

    public async Task HandleAsync(DomainEvent @event, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Processing UserRequestedPasswordResetEvent: {EventId}", @event.Id);

            var eventData = JsonConvert.DeserializeObject<UserRequestedPasswordResetEvent>(@event.EventData);
            if (eventData is null)
            {
                throw new InvalidOperationException("Failed to deserialize event data");
            }

            var emailBody = EmailTemplates.ResetPasswordEmail(eventData.BaseUrl + "/reset-password?token=" + eventData.Token, "YouNeed");
            await _emailService.SendEmailAsync(
                eventData.Email,
                "YouNeed - Prośba o zmianę hasła",
                emailBody);

            _logger.LogInformation("Successfully processed UserRequestedPasswordResetEvent: {EventId}", @event.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing UserRequestedPasswordResetEvent: {EventId}", @event.Id);
            throw;
        }
    }
}