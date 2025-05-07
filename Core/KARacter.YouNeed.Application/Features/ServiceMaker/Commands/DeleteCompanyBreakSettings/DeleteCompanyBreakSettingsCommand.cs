using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using KARacter.YouNeed.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyBreakSettings;

public record DeleteCompanyBreakSettingsCommand : IRequest<DeleteCompanyBreakSettingsResponse>
{
    public required Guid Id { get; init; }
}

public record DeleteCompanyBreakSettingsResponse
{
    public required bool IsSuccess { get; init; }
    public string? Message { get; init; }
}

public class DeleteCompanyBreakSettingsCommandValidator : AbstractValidator<DeleteCompanyBreakSettingsCommand>
{
    public DeleteCompanyBreakSettingsCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Identyfikator ustawień przerw jest wymagany.");
    }
}

public class DeleteCompanyBreakSettingsCommandHandler : IRequestHandler<DeleteCompanyBreakSettingsCommand, DeleteCompanyBreakSettingsResponse>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<DeleteCompanyBreakSettingsCommandHandler> _logger;

    public DeleteCompanyBreakSettingsCommandHandler(
        IYouNeedDbContext context,
        ILogger<DeleteCompanyBreakSettingsCommandHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<DeleteCompanyBreakSettingsResponse> Handle(DeleteCompanyBreakSettingsCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Rozpoczęto usuwanie ustawień przerw o id: {Id}", 
                request.Id);

            var breakSettings = await _context.CompanyBreakSettings
                .FirstOrDefaultAsync(x => x.Id == request.Id,
                    cancellationToken);

            if (breakSettings == null)
            {
                return new DeleteCompanyBreakSettingsResponse
                {
                    IsSuccess = false,
                    Message = "Nie znaleziono ustawień przerw."
                };
            }

            _context.CompanyBreakSettings.Remove(breakSettings);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Pomyślnie usunięto ustawienia przerw o id: {Id}", 
                request.Id);

            return new DeleteCompanyBreakSettingsResponse
            {
                IsSuccess = true,
                Message = "Pomyślnie usunięto ustawienia przerw."
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Wystąpił błąd podczas usuwania ustawień przerw o id: {Id}", 
                request.Id);
            return new DeleteCompanyBreakSettingsResponse
            {
                IsSuccess = false,
                Message = "Wystąpił błąd podczas usuwania ustawień przerw."
            };
        }
    }
} 