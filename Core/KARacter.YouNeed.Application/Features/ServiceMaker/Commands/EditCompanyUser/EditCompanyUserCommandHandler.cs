using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyUser;

public class EditCompanyUserCommandHandler : IRequestHandler<EditCompanyUserCommand, EditCompanyUserCommandResult>
{
    private readonly IYouNeedDbContext _dbContext;
    private readonly ILogger<EditCompanyUserCommandHandler> _logger;

    public EditCompanyUserCommandHandler(IYouNeedDbContext dbContext, ILogger<EditCompanyUserCommandHandler> logger)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<EditCompanyUserCommandResult> Handle(EditCompanyUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Editing user {UserId} in company {CompanyId}", request.UserId, request.CompanyId);

            var companyUser = await _dbContext.CompanyUsers
                .Include(x => x.Company)
                .Include(cu => cu.User)
                .Include(cu => cu.UserRole)
                .FirstOrDefaultAsync(cu => cu.CompanyId == request.CompanyId && cu.Id == request.UserId);

            _logger.LogInformation("CompanyId: {CompanyId}, UserId: {UserId}, Found CompanyUser: {CompanyUser}", 
                request.CompanyId, request.UserId, companyUser != null);

            if (companyUser == null)
            {
                _logger.LogError("Company user not found");
                return new EditCompanyUserCommandResult { IsSuccess = false, Message = "Użytkownik nie został znaleziony" };
            }

            var userRole = await _dbContext.UserRoles.FirstOrDefaultAsync(ur => ur.Name == request.UserRole);
            if (userRole == null)
            {
                _logger.LogError("User role not found");
                return new EditCompanyUserCommandResult { IsSuccess = false, Message = "Rola użytkownika nie została znaleziona" };
            }

            companyUser.User.FirstName = request.FirstName;
            companyUser.User.LastName = request.LastName;
            companyUser.User.PhoneNumber = request.PhoneNumber;
            companyUser.UserRoleId = userRole.Id;
            companyUser.UserRole = userRole;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return new EditCompanyUserCommandResult { IsSuccess = true, Message = "Dane użytkownika zostały zaktualizowane" };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error editing company user");
            return new EditCompanyUserCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas edycji użytkownika" };
        }
    }
}