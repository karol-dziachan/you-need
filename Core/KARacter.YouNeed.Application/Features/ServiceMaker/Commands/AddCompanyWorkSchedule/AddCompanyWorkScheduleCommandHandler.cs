using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyWorkSchedule;

public class AddCompanyWorkScheduleCommandHandler : IRequestHandler<AddCompanyWorkScheduleCommand, AddCompanyWorkScheduleCommandResult>
{
    private readonly IYouNeedDbContext _dbContext;
    private readonly ILogger<AddCompanyWorkScheduleCommandHandler> _logger;

    public AddCompanyWorkScheduleCommandHandler(
        IYouNeedDbContext dbContext,
        ILogger<AddCompanyWorkScheduleCommandHandler> logger)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<AddCompanyWorkScheduleCommandResult> Handle(AddCompanyWorkScheduleCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Adding work schedule for company {CompanyId} and user {UserId}", request.CompanyId, request.UserId);

            using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                var company = await _dbContext.Companies.FindAsync(request.CompanyId);
                if (company is null)
                {
                    _logger.LogError("Company not found");
                    return new AddCompanyWorkScheduleCommandResult { IsSuccess = false, Message = "Firma nie została znaleziona" };
                }

                var user = await _dbContext.CompanyUsers
                    .FirstOrDefaultAsync(cu => cu.CompanyId == request.CompanyId && cu.Id == request.UserId, cancellationToken);
                if (user is null)
                {
                    _logger.LogError("User not found in company");
                    return new AddCompanyWorkScheduleCommandResult { IsSuccess = false, Message = "Użytkownik nie został znaleziony w firmie" };
                }

                var schedule = new CompanyWorkSchedule
                {
                    CompanyId = request.CompanyId,
                    Company = company,
                    UserId = request.UserId,
                    User = user,
                    DayOfWeek = request.DayOfWeek,
                    StartTime = request.StartTime,
                    EndTime = request.EndTime,
                    IsActive = true,
                    IsBreakTime = request.IsBreakTime,
                    BreakStartTime = request.BreakStartTime,
                    BreakEndTime = request.BreakEndTime,
                    Notes = request.Notes
                };

                _dbContext.CompanyWorkSchedules.Add(schedule);
                await _dbContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);

                return new AddCompanyWorkScheduleCommandResult 
                { 
                    IsSuccess = true, 
                    Message = "Harmonogram został dodany", 
                    Id = schedule.Id 
                };
            }
            catch
            {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding work schedule");
            return new AddCompanyWorkScheduleCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas dodawania harmonogramu" };
        }
    }
}