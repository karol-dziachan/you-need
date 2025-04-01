using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using KARacter.YouNeed.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyBreakSettings;

public record EditCompanyBreakSettingsCommand : IRequest<EditCompanyBreakSettingsResponse>
{
    public required Guid Id { get; init; }
    public required Guid CompanyId { get; init; }
    public required Guid UserId { get; init; }
    public required int MinimumBreakBetweenOrdersInMinutes { get; init; }
    public required int MaximumOrdersPerDay { get; init; }
    public bool IsActive { get; init; }
    public bool AllowWeekendOrders { get; init; }
    public bool AllowHolidayOrders { get; init; }
    public string? ExcludedDates { get; init; }
    public string? SpecialBreakRules { get; init; }
}

public record EditCompanyBreakSettingsResponse
{
    public required bool IsSuccess { get; init; }
    public string? Message { get; init; }
}

public class EditCompanyBreakSettingsCommandValidator : AbstractValidator<EditCompanyBreakSettingsCommand>
{
    public EditCompanyBreakSettingsCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Identyfikator ustawień przerw jest wymagany.");

        RuleFor(x => x.CompanyId)
            .NotEmpty()
            .WithMessage("Identyfikator firmy jest wymagany.");

        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage("Identyfikator użytkownika jest wymagany.");

        RuleFor(x => x.MinimumBreakBetweenOrdersInMinutes)
            .GreaterThan(0)
            .WithMessage("Minimalny czas przerwy między zleceniami musi być większy od 0.");

        RuleFor(x => x.MaximumOrdersPerDay)
            .GreaterThan(0)
            .WithMessage("Maksymalna liczba zleceń dziennie musi być większa od 0.");
    }
}

public class EditCompanyBreakSettingsCommandHandler : IRequestHandler<EditCompanyBreakSettingsCommand, EditCompanyBreakSettingsResponse>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<EditCompanyBreakSettingsCommandHandler> _logger;

    public EditCompanyBreakSettingsCommandHandler(
        IYouNeedDbContext context,
        ILogger<EditCompanyBreakSettingsCommandHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<EditCompanyBreakSettingsResponse> Handle(EditCompanyBreakSettingsCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Rozpoczęto edycję ustawień przerw dla firmy: {CompanyId} i użytkownika: {UserId}", 
                request.CompanyId, request.UserId);

            var breakSettings = await _context.CompanyBreakSettings
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (breakSettings == null)
            {
                return new EditCompanyBreakSettingsResponse
                {
                    IsSuccess = false,
                    Message = "Nie znaleziono ustawień przerw."
                };
            }

            breakSettings.MinimumBreakBetweenOrdersInMinutes = request.MinimumBreakBetweenOrdersInMinutes;
            breakSettings.MaximumOrdersPerDay = request.MaximumOrdersPerDay;
            breakSettings.IsActive = request.IsActive;
            breakSettings.AllowWeekendOrders = request.AllowWeekendOrders;
            breakSettings.AllowHolidayOrders = request.AllowHolidayOrders;
            breakSettings.ExcludedDates = request.ExcludedDates;
            breakSettings.SpecialBreakRules = request.SpecialBreakRules;

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Pomyślnie zaktualizowano ustawienia przerw dla firmy: {CompanyId} i użytkownika: {UserId}", 
                request.CompanyId, request.UserId);

            return new EditCompanyBreakSettingsResponse
            {
                IsSuccess = true,
                Message = "Pomyślnie zaktualizowano ustawienia przerw."
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Wystąpił błąd podczas edycji ustawień przerw dla firmy: {CompanyId} i użytkownika: {UserId}", 
                request.CompanyId, request.UserId);
            return new EditCompanyBreakSettingsResponse
            {
                IsSuccess = false,
                Message = "Wystąpił błąd podczas edycji ustawień przerw."
            };
        }
    }
} 