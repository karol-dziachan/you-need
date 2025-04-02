using System.Text.Json.Serialization;
using FluentValidation;
using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.EntityOffer.Commands.AddEntityOffer;

public class AddEntityOfferCommand : IRequest<AddEntityOfferCommandResult>
{
    [JsonPropertyName("addEntityOfferDtos")]
    public ICollection<AddEntityOfferDto> AddEntityOfferDtos { get; set; }
}

public class AddEntityOfferDto
{
    public Guid OfferId { get; set; }
    public string WhichEntity { get; set; }
    public Guid EntityId { get; set; }
    public int TimeToCompleteInMinutes { get; set; }
    public double Price { get; set; }
    public string Currency { get; set; }
    public string UnitOfMeasure { get; set; }
    public bool IsActive { get; set; }
}

public class AddEntityOfferCommandResult
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
    public Guid? EntityOfferId { get; set; }
}

public class AddEntityOfferCommandValidator : AbstractValidator<AddEntityOfferCommand>
{
    public AddEntityOfferCommandValidator()
    {
       /* RuleFor(x => x.AddEntityOfferDtos).NotNull().WithMessage("Lista ofert nie może być pusta");
        RuleForEach(x => x.AddEntityOfferDtos).ChildRules(offer => {
            offer.RuleFor(x => x.OfferId).NotEmpty().WithMessage("ID oferty jest wymagane");
            offer.RuleFor(x => x.EntityId).NotEmpty().WithMessage("ID encji jest wymagane");
            offer.RuleFor(x => x.TimeToCompleteInMinutes).GreaterThanOrEqualTo(0).WithMessage("Czas realizacji musi być większy lub równy 0");
            offer.RuleFor(x => x.Price).GreaterThanOrEqualTo(0).WithMessage("Cena musi być większa lub równa 0");
            offer.RuleFor(x => x.Currency).NotEmpty().WithMessage("Waluta jest wymagana");
            offer.RuleFor(x => x.UnitOfMeasure).NotEmpty().WithMessage("Jednostka miary jest wymagana");

            offer.RuleFor(x => x.WhichEntity)
                .NotEmpty().WithMessage("Typ encji jest wymagany")
                .Must(x => x == "Company" || x == "Worker")
                .WithMessage("Encja musi być albo firmą albo pracownikiem");
        });*/
    }
}

public class AddEntityOfferCommandHandler : IRequestHandler<AddEntityOfferCommand, AddEntityOfferCommandResult>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<AddEntityOfferCommandHandler> _logger;

    public AddEntityOfferCommandHandler(IYouNeedDbContext context, ILogger<AddEntityOfferCommandHandler> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<AddEntityOfferCommandResult> Handle(AddEntityOfferCommand request, CancellationToken cancellationToken)
    {
        _logger.LogTrace("Adding entity offer. With data: {@Request}", request);
        try
        {
            using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
            try
            {
                foreach (var offer in request.AddEntityOfferDtos)
                {
                    var result = offer.WhichEntity switch
                    {
                        "Company" => await HandleAddCompanyEntityOffer(offer, cancellationToken),
                        "Worker" => await HandleAddWorkerEntityOffer(offer, cancellationToken),
                        _ => throw new ArgumentException($"Nieprawidłowy typ encji: {offer.WhichEntity}")
                    };
                    
                    if (!result.IsSuccess)
                    {
                        await transaction.RollbackAsync(cancellationToken);
                        return result;
                    }
                }

                await _context.SaveChangesAsync(cancellationToken);
                
                await transaction.CommitAsync(cancellationToken);
                return new AddEntityOfferCommandResult { IsSuccess = true, Message = "Oferty zostały dodane pomyślnie" };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                _logger.LogError(ex, "Error during transaction");
                return new AddEntityOfferCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas dodawania oferty" };
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding entity offer");
            return new AddEntityOfferCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas dodawania oferty" };
        }
    }

    private async Task<AddEntityOfferCommandResult> HandleAddCompanyEntityOffer(AddEntityOfferDto offer, CancellationToken cancellationToken)
    {
        _logger.LogTrace("Adding company entity offer. With data: {@Offer}", offer);

        var company = await _context.Companies
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == offer.EntityId, cancellationToken);

        if (company == null)
        {
            _logger.LogError("Company not found. With id: {@EntityId}", offer.EntityId);
            return new AddEntityOfferCommandResult { IsSuccess = false, Message = "Firma nie znaleziona" };
        }

        var existingEntityOffer = await _context.EntityOffers
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.OfferId == offer.OfferId && x.EntityId == offer.EntityId, cancellationToken);

        if (existingEntityOffer != null)
        {
            _logger.LogError("Entity offer already exists. With id: {@EntityOfferId}", existingEntityOffer.Id);
            return new AddEntityOfferCommandResult { IsSuccess = false, Message = "Oferta już istnieje" };
        }
        var entityOffer = new Domain.Entities.EntityOffer
        {
            WhichEntity = offer.WhichEntity,
            EntityId = offer.EntityId,
            OfferId = offer.OfferId,
            TimeToCompleteInMinutes = offer.TimeToCompleteInMinutes,
            Price = offer.Price,
            Currency = offer.Currency,
            UnitOfMeasure = offer.UnitOfMeasure,
            IsActive = offer.IsActive
        };

        await _context.EntityOffers.AddAsync(entityOffer, cancellationToken);

        return new AddEntityOfferCommandResult { IsSuccess = true, Message = "Oferta została dodana pomyślnie" };
    }

    private async Task<AddEntityOfferCommandResult> HandleAddWorkerEntityOffer(AddEntityOfferDto offer, CancellationToken cancellationToken)
    {
        _logger.LogTrace("Adding worker entity offer. With data: {@Offer}", offer);

        var worker = await _context.CompanyUsers
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == offer.EntityId, cancellationToken);

        if (worker == null)
        {
            _logger.LogError("Worker not found. With id: {@EntityId}", offer.EntityId);
            return new AddEntityOfferCommandResult { IsSuccess = false, Message = "Pracownik nie znaleziony" };
        }

        var existingEntityOffer = await _context.EntityOffers
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.OfferId == offer.OfferId && x.EntityId == offer.EntityId, cancellationToken);

        if (existingEntityOffer != null)
        {
            _logger.LogError("Entity offer already exists. With id: {@EntityOfferId}", existingEntityOffer.Id);
            return new AddEntityOfferCommandResult { IsSuccess = false, Message = "Oferta już istnieje" };
        }
        var entityOffer = new Domain.Entities.EntityOffer
        {
            WhichEntity = offer.WhichEntity,
            EntityId = offer.EntityId,
            OfferId = offer.OfferId,
            TimeToCompleteInMinutes = offer.TimeToCompleteInMinutes,
            Price = offer.Price,
            Currency = offer.Currency,
            UnitOfMeasure = offer.UnitOfMeasure,
            IsActive = offer.IsActive
        };

        await _context.EntityOffers.AddAsync(entityOffer, cancellationToken);

        return new AddEntityOfferCommandResult { IsSuccess = true, Message = "Oferta została dodana pomyślnie" };
    }
}

