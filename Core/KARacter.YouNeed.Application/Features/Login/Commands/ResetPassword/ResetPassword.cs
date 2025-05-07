using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Common.Options;
using KARacter.YouNeed.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace KARacter.YouNeed.Application.Features.Login.Commands.ResetPassword;

public class ResetPasswordCommand : IRequest<ResetPasswordResponse>
{
    public string Email { get; set; }
}

public class ResetPasswordResponse
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
}

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, ResetPasswordResponse>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<ResetPasswordCommandHandler> _logger;
    private readonly IOptions<EmailSettingsOptions> _appSettings;

    public ResetPasswordCommandHandler(IYouNeedDbContext context, IOptions<EmailSettingsOptions> appSettings, ILogger<ResetPasswordCommandHandler> logger)
    {
        _context = context;
        _appSettings = appSettings;
        _logger = logger;
    }

    public async Task<ResetPasswordResponse> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

            if (user == null)
            {
                return new ResetPasswordResponse { IsSuccess = true, Message = "Email zresetowany pomyślnie" };
            }

                var domainEvent = new DomainEvent
                {
                    IsHandled = false,
                    EventType = "UserRequestedPasswordResetEvent",
                    EventData = JsonConvert.SerializeObject(new { Email = request.Email, Token = Base64UrlEncoder.Encode(Guid.NewGuid().ToByteArray()), BaseUrl = _appSettings.Value.FrontendBaseUrl}),
                    RetryCount = 0
                };

            await _context.DomainEvents.AddAsync(domainEvent, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new ResetPasswordResponse { IsSuccess = true, Message = "Hasło zmienione pomyślnie" };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resetting password");
            return new ResetPasswordResponse { IsSuccess = false, Message = "Wystąpił błąd podczas zmiany hasła" };
        }
    }
}