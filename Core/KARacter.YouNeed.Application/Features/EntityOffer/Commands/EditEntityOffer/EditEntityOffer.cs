using FluentValidation;
using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.EntityOffer.Commands.EditEntityOffer;

public class EditEntityOfferCommand : IRequest<EditEntityOfferCommandResult>
{
    public Guid Id { get; set; }
    public string WhichEntity { get; set; }
    public int TimeToCompleteInMinutes { get; set; }
    public double Price { get; set; }
    public string Currency { get; set; }
    public string UnitOfMeasure { get; set; }
    public bool IsActive { get; set; }
}

public class EditEntityOfferCommandValidator : AbstractValidator<EditEntityOfferCommand>
{
    public EditEntityOfferCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.TimeToCompleteInMinutes).NotEmpty();
        RuleFor(x => x.Price).NotEmpty();
        RuleFor(x => x.Currency).NotEmpty();
        RuleFor(x => x.UnitOfMeasure).NotEmpty();
        RuleFor(x => x.IsActive).NotEmpty();
    }
}

public class EditEntityOfferCommandResult
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
}

public class EditEntityOfferCommandHandler : IRequestHandler<EditEntityOfferCommand, EditEntityOfferCommandResult>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<EditEntityOfferCommandHandler> _logger;

    public EditEntityOfferCommandHandler(IYouNeedDbContext context, ILogger<EditEntityOfferCommandHandler> logger)
    {
        _context = context;
        _logger = logger;
    }
    public async Task<EditEntityOfferCommandResult> Handle(EditEntityOfferCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Starting to edit entity offer with ID: {Id}", request.Id);
        _logger.LogDebug("Edit entity offer request details: {@Request}", request);

        try
        {
            using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
            try
            {
                var entityOffer = await _context.EntityOffers
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (entityOffer is null)
                {
                    _logger.LogWarning("Entity offer with ID {Id} was not found", request.Id);
                    return new EditEntityOfferCommandResult { IsSuccess = false, Message = "Oferta nie znaleziona" };
                }

                _logger.LogDebug("Found entity offer: {@EntityOffer}", entityOffer);

                entityOffer.TimeToCompleteInMinutes = request.TimeToCompleteInMinutes;
                entityOffer.Price = request.Price;
                entityOffer.Currency = request.Currency;
                entityOffer.UnitOfMeasure = request.UnitOfMeasure;
                entityOffer.IsActive = request.IsActive;

                _logger.LogDebug("Updating entity offer with new values: {@UpdatedEntityOffer}", entityOffer);
                
                await _context.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);

                _logger.LogInformation("Successfully edited entity offer with ID: {Id}", request.Id);
                return new EditEntityOfferCommandResult { IsSuccess = true, Message = "Oferta została edytowana pomyślnie" };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to edit entity offer with ID {Id} during database operation", request.Id);
                await transaction.RollbackAsync(cancellationToken);
                return new EditEntityOfferCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas edycji oferty" };
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error while editing entity offer with ID {Id}", request.Id);
            return new EditEntityOfferCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas edycji oferty" };
        }
    }
}
