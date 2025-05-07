namespace KARacter.YouNeed.Application.Common.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string email, string subject, string message);
}
