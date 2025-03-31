using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.ActivateCompanyUser;

public class ActivateCompanyUserCommandHandler : IRequestHandler<ActivateCompanyUserCommand, ActivateCompanyUserCommandResult>
{
    private readonly IYouNeedDbContext _dbContext;
    private readonly ILogger<ActivateCompanyUserCommandHandler> _logger;

    public ActivateCompanyUserCommandHandler(
        IYouNeedDbContext dbContext,
        ILogger<ActivateCompanyUserCommandHandler> logger)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<ActivateCompanyUserCommandResult> Handle(ActivateCompanyUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Activating user {UserId} in company {CompanyId}", request.UserId, request.CompanyId);

            using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                var companyUser = await _dbContext.CompanyUsers
                    .Include(cu => cu.User)
                    .FirstOrDefaultAsync(cu => 
                        cu.CompanyId == request.CompanyId && 
                        cu.Id == request.UserId, 
                        cancellationToken);

                if (companyUser is null)
                {
                    _logger.LogError("Company user not found");
                    return new ActivateCompanyUserCommandResult 
                    { 
                        IsSuccess = false, 
                        Message = "Użytkownik nie został znaleziony" 
                    };
                }

                if (companyUser.IsActive)
                {
                    _logger.LogInformation("User is already active");
                    return new ActivateCompanyUserCommandResult 
                    { 
                        IsSuccess = false, 
                        Message = "Użytkownik jest już aktywny" 
                    };
                }

                companyUser.IsActive = true;
                companyUser.EndDate = null;
                companyUser.User.IsActive = true;

                var user = await _dbContext.Users.FindAsync(companyUser.UserId);
                if (user is not null)
                {
                    user.IsActive = true;
                }

                await _dbContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);

                _logger.LogInformation("User successfully activated");
                return new ActivateCompanyUserCommandResult 
                { 
                    IsSuccess = true, 
                    Message = "Użytkownik został aktywowany" 
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                throw new Exception("Błąd podczas aktywacji użytkownika", ex);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error activating user");
            return new ActivateCompanyUserCommandResult 
            { 
                IsSuccess = false, 
                Message = "Wystąpił błąd podczas aktywacji użytkownika" 
            };
        }
    }
}
