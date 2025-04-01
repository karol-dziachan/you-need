using FluentValidation;
using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.EntityOffer.Commands.EditEntityOffer;

public class EditEntityOfferCommand : IRequest<EditEntityOfferCommandResult>
{
    public Guid Id { get; set; }
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
        _logger.LogTrace("Editing entity offer. With data: {@Request}", request);
        try
        {
            using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
            try
            {
                var entityOffer = await _context.EntityOffers
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (entityOffer == null)
                {
                    _logger.LogError("Entity offer not found. With id: {@Id}", request.Id);
                    return new EditEntityOfferCommandResult { IsSuccess = false, Message = "Oferta nie znaleziona" };
                }

                entityOffer.TimeToCompleteInMinutes = request.TimeToCompleteInMinutes;
                entityOffer.Price = request.Price;
                entityOffer.Currency = request.Currency;
                entityOffer.UnitOfMeasure = request.UnitOfMeasure;
                entityOffer.IsActive = request.IsActive;

                await _context.SaveChangesAsync(cancellationToken);

                await transaction.CommitAsync(cancellationToken);
                return new EditEntityOfferCommandResult { IsSuccess = true, Message = "Oferta została edytowana pomyślnie" };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error editing entity offer");
                return new EditEntityOfferCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas edycji oferty" };
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error editing entity offer");
            return new EditEntityOfferCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas edycji oferty" };
        }
    }
}
