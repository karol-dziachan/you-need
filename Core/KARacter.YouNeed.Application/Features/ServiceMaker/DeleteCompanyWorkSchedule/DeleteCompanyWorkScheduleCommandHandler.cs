using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyWorkSchedule;

public class DeleteCompanyWorkScheduleCommandHandler : IRequestHandler<DeleteCompanyWorkScheduleCommand, DeleteCompanyWorkScheduleCommandResult>
{
    private readonly IYouNeedDbContext _dbContext;
    private readonly ILogger<DeleteCompanyWorkScheduleCommandHandler> _logger;

    public DeleteCompanyWorkScheduleCommandHandler(
        IYouNeedDbContext dbContext,
        ILogger<DeleteCompanyWorkScheduleCommandHandler> logger)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<DeleteCompanyWorkScheduleCommandResult> Handle(DeleteCompanyWorkScheduleCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Deactivating work schedule {Id} for company {CompanyId}", request.Id, request.CompanyId);

            using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                var schedule = await _dbContext.CompanyWorkSchedules
                    .FirstOrDefaultAsync(s => s.Id == request.Id && s.CompanyId == request.CompanyId, cancellationToken);

                if (schedule is null)
                {
                    _logger.LogError("Work schedule not found");
                    return new DeleteCompanyWorkScheduleCommandResult 
                    { 
                        IsSuccess = false, 
                        Message = "Harmonogram nie został znaleziony" 
                    };
                }

                if (!schedule.IsActive)
                {
                    _logger.LogInformation("Work schedule is already inactive");
                    return new DeleteCompanyWorkScheduleCommandResult 
                    { 
                        IsSuccess = false, 
                        Message = "Harmonogram jest już nieaktywny" 
                    };
                }

                var updatedSchedule = schedule with
                {
                    IsActive = false
                };

                _dbContext.CompanyWorkSchedules.Entry(schedule).CurrentValues.SetValues(updatedSchedule);
                await _dbContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);

                _logger.LogInformation("Work schedule successfully deactivated");
                return new DeleteCompanyWorkScheduleCommandResult 
                { 
                    IsSuccess = true, 
                    Message = "Harmonogram został dezaktywowany" 
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
            _logger.LogError(ex, "Error deactivating work schedule");
            return new DeleteCompanyWorkScheduleCommandResult 
            { 
                IsSuccess = false, 
                Message = "Wystąpił błąd podczas dezaktywacji harmonogramu" 
            };
        }
    }
}