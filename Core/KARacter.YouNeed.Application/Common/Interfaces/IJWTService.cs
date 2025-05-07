namespace KARacter.YouNeed.Application.Common.Interfaces;

public interface IJWTService
{
    string GenerateToken(string email, string role);

    string ValidateToken(string token);

    string GetUserRole(string token);
}
