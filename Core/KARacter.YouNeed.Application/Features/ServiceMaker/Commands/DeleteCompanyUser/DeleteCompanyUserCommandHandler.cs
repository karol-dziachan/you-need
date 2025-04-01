using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Domain.Entities;
using KARacter.YouNeed.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyUser;

public class DeleteCompanyUserCommandHandler : IRequestHandler<DeleteCompanyUserCommand, DeleteCompanyUserCommandResult>
{
    private readonly IYouNeedDbContext _dbContext;
    private readonly ILogger<DeleteCompanyUserCommandHandler> _logger;

    public DeleteCompanyUserCommandHandler(IYouNeedDbContext dbContext, ILogger<DeleteCompanyUserCommandHandler> logger)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<DeleteCompanyUserCommandResult> Handle(DeleteCompanyUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Deleting user {UserId} from company {CompanyId}", request.UserId, request.CompanyId);

        var companyUser = await _dbContext.CompanyUsers
            .Include(cu => cu.Company)
            .Include(cu => cu.User)
            .FirstOrDefaultAsync(cu => cu.CompanyId == request.CompanyId && cu.Id == request.UserId);

        if (companyUser == null)
        {
            _logger.LogError("Company user not found");
            return new DeleteCompanyUserCommandResult { IsSuccess = false, Message = "Użytkownik nie został znaleziony" };
        }

        // Zamiast fizycznego usuwania, dezaktywujemy użytkownika
        companyUser.IsActive = false;
        companyUser.EndDate = DateTime.UtcNow;
        companyUser.User.IsActive = false;

        var user = await _dbContext.Users.FindAsync(companyUser.UserId);
        if (user != null)
        {
            user.IsActive = false;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        var domainEvent = new DomainEvent
        {
            IsHandled = false,
            EventType = "UserDeactivatedEvent",
            EventData = JsonConvert.SerializeObject(new UserDeactivatedEvent { Id = companyUser.Id, Email = companyUser.User.Email, CompanyName = companyUser.Company.Name }),
            RetryCount = 0
        };
        return new DeleteCompanyUserCommandResult { IsSuccess = true, Message = "Użytkownik został usunięty" };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting company user");
            return new DeleteCompanyUserCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas usuwania użytkownika" };
        }
    }
}