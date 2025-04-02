using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace KARacter.YouNeed.Application.Features.Login.Commands.ChangePassword;

public class ChangePasswordCommand : IRequest<ChangePasswordResponse>
{
    public string Token { get; set; }
    public string Password { get; set; }
}

public class ChangePasswordResponse
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
}

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, ChangePasswordResponse>
{
    private readonly IYouNeedDbContext _context;
    private readonly IJWTService _jwtTokenService;
    private readonly ILogger<ChangePasswordCommandHandler> _logger;
    public ChangePasswordCommandHandler(IYouNeedDbContext context, IJWTService jwtTokenService, ILogger<ChangePasswordCommandHandler> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _jwtTokenService = jwtTokenService ?? throw new ArgumentNullException(nameof(jwtTokenService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }
    public async Task<ChangePasswordResponse> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Changing password for token: {Token}", request.Token);

        try
        {
            var email = _jwtTokenService.ValidateToken(request.Token);
            if (email == null)
            {
                return new ChangePasswordResponse { IsSuccess = false, Message = "Nieprawidłowy token" };
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email, cancellationToken);
            if (user == null)
            {
                _logger.LogError("User not found for email: {Email}", email);
                return new ChangePasswordResponse { IsSuccess = false, Message = "Nieprawidłowy token" };
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            await _context.SaveChangesAsync(cancellationToken);

            var domainEvent = new DomainEvent
            {
                IsHandled = false,
                EventType = "UserChangedPasswordEvent",
                EventData = JsonConvert.SerializeObject(new UserChangedPasswordEvent { Email = user.Email }),
                RetryCount = 0
            };

            await _context.DomainEvents.AddAsync(domainEvent, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Password changed for user: {Email}", email);    
            return new ChangePasswordResponse { IsSuccess = true, Message = "Hasło zmienione pomyślnie" };
            
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error changing password");
            return new ChangePasswordResponse { IsSuccess = false, Message = "Wystąpił błąd podczas zmiany hasła" };
        }
    }
}


