using System;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Common.Options;

namespace KARacter.YouNeed.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly IOptionsSnapshot<EmailSettingsOptions> _emailSettings;
    private readonly ILogger<EmailService> _logger;

    public EmailService(
        IOptionsSnapshot<EmailSettingsOptions> emailSettings,
        ILogger<EmailService> logger)
    {
        _emailSettings = emailSettings ?? throw new ArgumentNullException(nameof(emailSettings));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task SendEmailAsync(string email, string subject, string body)
    {
        try
        {
            _logger.LogInformation("Próba wysłania emaila do {Email} z tematem: {Subject}", email, subject);
            var settings = _emailSettings.Value;

            using var message = new MailMessage
            {
                From = new MailAddress(settings.SenderEmail, settings.SenderName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            message.To.Add(email);

            using var client = new SmtpClient(settings.SmtpServer, settings.SmtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(settings.SmtpUsername, settings.SmtpPassword)
            };

            await client.SendMailAsync(message);
            _logger.LogInformation("Email wysłany pomyślnie do {Email}", email);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Błąd podczas wysyłania emaila do {Email}: {Error}", email, ex.Message);
            throw;
        }
    }
}