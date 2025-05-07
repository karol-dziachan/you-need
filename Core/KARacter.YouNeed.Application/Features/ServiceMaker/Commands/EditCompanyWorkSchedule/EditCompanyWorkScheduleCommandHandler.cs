// EditCompanyWorkScheduleCommandHandler.cs
using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyWorkSchedule;

public class EditCompanyWorkScheduleCommandHandler : IRequestHandler<EditCompanyWorkScheduleCommand, EditCompanyWorkScheduleCommandResult>
{
    private readonly IYouNeedDbContext _dbContext;
    private readonly ILogger<EditCompanyWorkScheduleCommandHandler> _logger;

    public EditCompanyWorkScheduleCommandHandler(
        IYouNeedDbContext dbContext,
        ILogger<EditCompanyWorkScheduleCommandHandler> logger)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<EditCompanyWorkScheduleCommandResult> Handle(EditCompanyWorkScheduleCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Editing work schedule {Id} for company {CompanyId}", request.Id, request.CompanyId);

            using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                var schedule = await _dbContext.CompanyWorkSchedules
                    .Include(s => s.Company)
                    .Include(s => s.User)
                    .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);

                if (schedule is null)
                {
                    _logger.LogError("Work schedule not found");
                    return new EditCompanyWorkScheduleCommandResult { IsSuccess = false, Message = "Harmonogram nie został znaleziony" };
                }

                var user = await _dbContext.CompanyUsers
                    .FirstOrDefaultAsync(cu => cu.CompanyId == request.CompanyId && cu.Id == request.UserId, cancellationToken);
                if (user is null)
                {
                    _logger.LogError("User not found in company");
                    return new EditCompanyWorkScheduleCommandResult { IsSuccess = false, Message = "Użytkownik nie został znaleziony w firmie" };
                }

                var updatedSchedule = schedule with
                {
                    UserId = request.UserId,
                    User = user,
                    DayOfWeek = request.DayOfWeek,
                    StartTime = request.StartTime,
                    EndTime = request.EndTime,
                    IsBreakTime = request.IsBreakTime,
                    BreakStartTime = request.BreakStartTime,
                    BreakEndTime = request.BreakEndTime,
                    Notes = request.Notes
                };

                _dbContext.CompanyWorkSchedules.Entry(schedule).CurrentValues.SetValues(updatedSchedule);
                await _dbContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);

                return new EditCompanyWorkScheduleCommandResult 
                { 
                    IsSuccess = true, 
                    Message = "Harmonogram został zaktualizowany" 
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
            _logger.LogError(ex, "Error editing work schedule");
            return new EditCompanyWorkScheduleCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas aktualizacji harmonogramu" };
        }
    }
}