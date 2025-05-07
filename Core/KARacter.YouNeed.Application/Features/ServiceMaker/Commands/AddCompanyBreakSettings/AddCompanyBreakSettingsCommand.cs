using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using KARacter.YouNeed.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using KARacter.YouNeed.Domain.Entities;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyBreakSettings;

public record AddCompanyBreakSettingsCommand : IRequest<AddCompanyBreakSettingsResponse>
{
    public required Guid CompanyId { get; init; }
    public required Guid UserId { get; init; }
    public required int MinimumBreakBetweenOrdersInMinutes { get; init; }
    public required int MaximumOrdersPerDay { get; init; }
    public bool IsActive { get; init; } = true;
    public bool AllowWeekendOrders { get; init; }
    public bool AllowHolidayOrders { get; init; }
    public string? ExcludedDates { get; init; }
    public string? SpecialBreakRules { get; init; }
}

public record AddCompanyBreakSettingsResponse
{
    public required bool IsSuccess { get; init; }
    public string? Message { get; init; }
    public Guid? BreakSettingsId { get; init; }
}

public class AddCompanyBreakSettingsCommandValidator : AbstractValidator<AddCompanyBreakSettingsCommand>
{
    public AddCompanyBreakSettingsCommandValidator()
    {
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

public class AddCompanyBreakSettingsCommandHandler : IRequestHandler<AddCompanyBreakSettingsCommand, AddCompanyBreakSettingsResponse>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<AddCompanyBreakSettingsCommandHandler> _logger;

    public AddCompanyBreakSettingsCommandHandler(
        IYouNeedDbContext context,
        ILogger<AddCompanyBreakSettingsCommandHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<AddCompanyBreakSettingsResponse> Handle(AddCompanyBreakSettingsCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Rozpoczęto dodawanie ustawień przerw dla firmy: {CompanyId} i użytkownika: {UserId}", 
                request.CompanyId, request.UserId);

            // Check if company exists
            var company = await _context.Companies
                .FirstOrDefaultAsync(x => x.Id == request.CompanyId, cancellationToken);

            if (company is null)
            {
                return new AddCompanyBreakSettingsResponse
                {
                    IsSuccess = false,
                    Message = "Nie znaleziono firmy o podanym identyfikatorze."
                };
            }

            // Check if user exists
            var user = await _context.CompanyUsers
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

            if (user is null)
            {
                return new AddCompanyBreakSettingsResponse
                {
                    IsSuccess = false,
                    Message = "Nie znaleziono użytkownika o podanym identyfikatorze."
                };
            }

            var existingSettings = await _context.CompanyBreakSettings
                .FirstOrDefaultAsync(x => x.CompanyId == request.CompanyId && x.UserId == request.UserId, cancellationToken);

            if (existingSettings is not null)
            {
                return new AddCompanyBreakSettingsResponse
                {
                    IsSuccess = false,
                    Message = "Ustawienia przerw dla tego użytkownika już istnieją."
                };
            }

            var breakSettings = new CompanyBreakSettings
            {
                CompanyId = request.CompanyId,
                Company = company,
                User = user.User,
                UserId = request.UserId,
                MinimumBreakBetweenOrdersInMinutes = request.MinimumBreakBetweenOrdersInMinutes,
                MaximumOrdersPerDay = request.MaximumOrdersPerDay,
                IsActive = request.IsActive,
                AllowWeekendOrders = request.AllowWeekendOrders,
                AllowHolidayOrders = request.AllowHolidayOrders,
                ExcludedDates = request.ExcludedDates,
                SpecialBreakRules = request.SpecialBreakRules
            };

            _context.CompanyBreakSettings.Add(breakSettings);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Pomyślnie dodano ustawienia przerw dla firmy: {CompanyId} i użytkownika: {UserId}", 
                request.CompanyId, request.UserId);

            return new AddCompanyBreakSettingsResponse
            {
                IsSuccess = true,
                Message = "Pomyślnie dodano ustawienia przerw.",
                BreakSettingsId = breakSettings.Id
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Wystąpił błąd podczas dodawania ustawień przerw dla firmy: {CompanyId} i użytkownika: {UserId}", 
                request.CompanyId, request.UserId);
            return new AddCompanyBreakSettingsResponse
            {
                IsSuccess = false,
                Message = "Wystąpił błąd podczas dodawania ustawień przerw. Sprawdź czy użytkownik i firma istnieją w systemie."
            };
        }
    }
} 