using MediatR;
using KARacter.YouNeed.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using KARacter.YouNeed.Domain.Enums;
namespace KARacter.YouNeed.Application.Features.Login.Queries.Login;

public class LoginQueryHandler : IRequestHandler<LoginQuery, LoginQueryResult>
{
    private readonly IYouNeedDbContext _dbContext;
    private readonly ILogger<LoginQueryHandler> _logger;
    private readonly IJWTService _jwtService;
    public LoginQueryHandler(IYouNeedDbContext dbContext, ILogger<LoginQueryHandler> logger, IJWTService jwtService)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));   
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _jwtService = jwtService ?? throw new ArgumentNullException(nameof(jwtService));
    }
    public async Task<LoginQueryResult> Handle(LoginQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Logowanie użytkownika: {Email}", request.Email);

        _logger.LogDebug("Wyszukiwanie użytkownika w bazie danych dla email: {Email}", request.Email);
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);
        if (user is null)
        {
            _logger.LogWarning("Nie znaleziono użytkownika o email: {Email}", request.Email);
            _logger.LogDebug("Zwracanie odpowiedzi o niepowodzeniu logowania");
            return new LoginQueryResult
            {
                IsSuccess = false,
                Message = "Nieprawidłowy email lub hasło",
                Token = null
            };
        }

        if (!user.IsActive)
        {
            _logger.LogWarning("Użytkownik: {Email} jest nieaktywny", request.Email);
            return new LoginQueryResult
            {
                IsSuccess = false,
                Message = "Użytkownik jest nieaktywny",
                Token = null
            };
        }
        

        _logger.LogDebug("Weryfikacja hasła dla użytkownika: {Email}", request.Email);
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            _logger.LogWarning("Nieprawidłowe hasło dla użytkownika: {Email}", request.Email);
            _logger.LogDebug("Zwracanie odpowiedzi o niepowodzeniu logowania");
            return new LoginQueryResult
            {
                IsSuccess = false,
                Message = "Nieprawidłowy email lub hasło",
                Token = null
            };
        }

        _logger.LogDebug("Generowanie tokenu JWT dla użytkownika: {Email}", request.Email);
        var companyUser = await _dbContext.CompanyUsers
        .Include(c => c.Company)
        .Include(c => c.UserRole)
        .FirstOrDefaultAsync(c => c.UserId == user.Id, cancellationToken);

        _logger.LogInformation("Użytkownik: {Email} jest członkiem firmy: {CompanyId}", request.Email, companyUser?.CompanyId);

        string role = "";

        if (companyUser is not null)
        {
            role = companyUser.UserRole.Name; 
        }
        else 
        {
            role = UserRoleEnum.Customer.ToString();
        }
        var token = _jwtService.GenerateToken(user.Email, role);
        _logger.LogInformation("Pomyślnie zalogowano użytkownika: {Email}", request.Email);

        user.LastLoginDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Europe/Warsaw"));

        _logger.LogInformation("Zapisuję zmiany w bazie danych");
        await _dbContext.SaveChangesAsync(cancellationToken);
        
        return new LoginQueryResult
        {
            IsSuccess = true,
            Message = "Login successful",
            Token = token
        };

    }
}