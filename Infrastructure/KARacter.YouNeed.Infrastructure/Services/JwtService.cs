using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Common.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace KARacter.YouNeed.Infrastructure.Services;

public class JwtService : IJWTService
{
    private readonly IOptions<JwtOptions> _jwtOptions;
    private readonly ILogger<JwtService> _logger;
    private readonly TokenValidationParameters _tokenValidationParameters;

    public JwtService(IOptions<JwtOptions> jwtOptions, ILogger<JwtService> logger)
    {
        _jwtOptions = jwtOptions ?? throw new ArgumentNullException(nameof(jwtOptions));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        
        _tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero,
            ValidIssuer = _jwtOptions.Value.Issuer,
            ValidAudience = _jwtOptions.Value.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Value.SecretKey))
        };
    }

    public string GenerateToken(string email, string role)
    {
        try
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Value.SecretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _jwtOptions.Value.Issuer,
                audience: _jwtOptions.Value.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtOptions.Value.ExpiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Błąd podczas generowania tokenu JWT");
            throw new InvalidOperationException("Nie można wygenerować tokenu JWT", ex);
        }
    }

    public string GetUserRole(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var claimsPrincipal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out _);
            
            var roleClaim = claimsPrincipal.FindFirst(ClaimTypes.Role);
            if (roleClaim is null)
            {
                throw new SecurityTokenException("Token nie zawiera informacji o roli użytkownika");
            }

            return roleClaim.Value;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Błąd podczas odczytywania roli z tokenu JWT");
            throw new SecurityTokenException("Nie można odczytać roli z tokenu", ex);
        }
    }

    public string ValidateToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var claimsPrincipal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out _);
            
            var emailClaim = claimsPrincipal.FindFirst(ClaimTypes.Email);
            if (emailClaim is null)
            {
                throw new SecurityTokenException("Token nie zawiera adresu email");
            }

            return emailClaim.Value;
        }
        catch (SecurityTokenExpiredException)
        {
            _logger.LogWarning("Próba użycia wygasłego tokenu JWT");
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Błąd podczas walidacji tokenu JWT");
            throw new SecurityTokenException("Token jest nieprawidłowy", ex);
        }
    }
}
