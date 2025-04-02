using MediatR;
using KARacter.YouNeed.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
namespace KARacter.YouNeed.Application.Features.EntityOffer.Queries.GetOffersForProvider;

public class GetOffersForProviderQuery : IRequest<GetOffersForProviderQueryResult>
{
    public Guid CompanyId { get; set; }
    public string Token { get; set; }
}

public class GetOffersForProviderQueryResult
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
    public List<CompanyOfferDto> OffersForCompany { get; set; } = new List<CompanyOfferDto>();
    public List<WorkerOfferDto> OffersForWorker { get; set; } = new List<WorkerOfferDto>();
}

public class OfferDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string PathToImage { get; set; }
    public string Description { get; set; }
    public bool IsHead { get; set; }

    public bool IsActive { get; set; }
    public bool IsParentOffer { get; set; }
    public Guid? ParentOfferId { get; set; }
    public bool IsAddedByUser { get; set; }
}

public abstract class BaseEntityOfferDto
{
    public Guid Id { get; set; }
    public int TimeToCompleteInMinutes { get; set; }
    public double Price { get; set; }
    public string? Currency { get; set; }
    public string? UnitOfMeasure { get; set; }
    public bool IsActive { get; set; }

    public Guid? ParentOfferId { get; set; }

    public required Guid OfferId { get; set; }
    public OfferDto Offer { get; set; }
}

public class CompanyOfferDto : BaseEntityOfferDto
{
    public Guid CompanyId { get; set; }
    public CompanyDto Company { get; set; }
}

public class CompanyDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
}

public class CompanyUserDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
}


public class WorkerOfferDto : BaseEntityOfferDto
{
    public Guid CompanyUserId { get; set; }
    public CompanyUserDto Worker { get; set; }
}


public class GetOffersForProviderQueryHandler : IRequestHandler<GetOffersForProviderQuery, GetOffersForProviderQueryResult>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<GetOffersForProviderQueryHandler> _logger;
    private readonly IJWTService _jwtService;

    public GetOffersForProviderQueryHandler(IYouNeedDbContext context, ILogger<GetOffersForProviderQueryHandler> logger, IJWTService jwtService)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _jwtService = jwtService ?? throw new ArgumentNullException(nameof(jwtService));
    }

    public async Task<GetOffersForProviderQueryResult> Handle(GetOffersForProviderQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting offers for provider {CompanyId}", request.CompanyId);

        try
        {
            var company = await _context.Companies
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == request.CompanyId, cancellationToken);
        
            if (company is null)
            {
                _logger.LogError("Company not found for id {CompanyId}", request.CompanyId);
                return new GetOffersForProviderQueryResult { IsSuccess = false, Message = "Nie udało się pobrać ofert"};
            }

            var email = _jwtService.ValidateToken(request.Token);

            var role = _jwtService.GetUserRole(request.Token);

            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);

            if (user is null)
            {
                _logger.LogError("User not found for email {Email}", email);    
                return new GetOffersForProviderQueryResult { IsSuccess = false, Message = "Nie udało się pobrać ofert"};
            }

            var companyUser = await _context.CompanyUsers
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.UserId == user.Id && c.CompanyId == request.CompanyId, cancellationToken);

            if (companyUser is null)
            {
                _logger.LogError("Company user not found for user {UserId} and company {CompanyId}", user.Id, request.CompanyId);
                return new GetOffersForProviderQueryResult { IsSuccess = false, Message = "Nie udało się pobrać ofert"};
            }
            
            // Load all required data upfront
            var entityOffers = await _context.EntityOffers
                .AsNoTracking()
                .Include(e => e.Offer)
                .ToListAsync(cancellationToken);

            var companyUsers = await _context.CompanyUsers
                .AsNoTracking()
                .Include(c => c.User)
                .ToListAsync(cancellationToken);

            var entityOffersForCompany = entityOffers
                .Where(e => e.WhichEntity == "Company")

                .Select(e => new CompanyOfferDto
                {
                    Id = e.Id,
                    ParentOfferId = e.Offer.ParentOfferId,
                    TimeToCompleteInMinutes = e.TimeToCompleteInMinutes,
                    Price = e.Price,
                    Currency = e.Currency,
                    UnitOfMeasure = e.UnitOfMeasure,
                    IsActive = e.IsActive,
                    OfferId = e.OfferId,
                    Offer = new OfferDto
                    {
                        Id = e.Offer.Id,
                        Name = e.Offer.Name,
                        PathToImage = e.Offer.PathToImage,
                        Description = e.Offer.Description,
                        IsHead = e.Offer.IsHead,
                        IsActive = e.Offer.IsActive,
                        IsParentOffer = e.Offer.IsParentOffer,
                        ParentOfferId = e.Offer.ParentOfferId,
                        IsAddedByUser = e.Offer.IsAddedByUser,
                    },
                    CompanyId = e.EntityId,
                    Company = new CompanyDto
                    {
                        Id = company.Id,
                        Name = company.Name,
                        Address = company.Address,
                        City = company.City,
                    },
                })
                .ToList();

            var entityOffersForWorker = entityOffers
                .Where(e => e.WhichEntity == "Worker")
                .Where(e => role == "CompanyAdmin" || e.EntityId == companyUser.Id)
                .Select(e =>
                {
                    var companyUser = companyUsers.FirstOrDefault(cu => cu.Id == e.EntityId);
                    return new WorkerOfferDto
                    {
                        Id = e.Id,
                        ParentOfferId = e.Offer.ParentOfferId,
                        TimeToCompleteInMinutes = e.TimeToCompleteInMinutes,
                        Price = e.Price,
                        Currency = e.Currency,
                        UnitOfMeasure = e.UnitOfMeasure,
                        IsActive = e.IsActive,
                        OfferId = e.OfferId,
                        Offer = new OfferDto
                        {
                            Id = e.Offer.Id,
                            Name = e.Offer.Name,
                            PathToImage = e.Offer.PathToImage,
                            Description = e.Offer.Description,
                            IsHead = e.Offer.IsHead,
                            IsActive = e.Offer.IsActive,
                            IsParentOffer = e.Offer.IsParentOffer,
                            ParentOfferId = e.Offer.ParentOfferId,
                            IsAddedByUser = e.Offer.IsAddedByUser,
                        },
                        CompanyUserId = e.EntityId,
                        Worker = companyUser is not null ? new CompanyUserDto
                        {
                            Id = companyUser.Id,
                            FirstName = companyUser.User.FirstName,
                            LastName = companyUser.User.LastName,
                            Email = companyUser.User.Email,
                        } : null,
                    };
                })
                .ToList();

            _logger.LogInformation("Found {CompanyOffersCount} company offers and {WorkerOffersCount} worker offers", 
                entityOffersForCompany.Count, 
                entityOffersForWorker.Count);

            return new GetOffersForProviderQueryResult
            {
                IsSuccess = true,
                Message = "Oferty zostały pobrane pomyślnie",
                OffersForCompany = entityOffersForCompany,
                OffersForWorker = entityOffersForWorker,
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting offers for provider {CompanyId}", request.CompanyId);
            return new GetOffersForProviderQueryResult { IsSuccess = false, Message = "Nie udało się pobrać ofert"};
        }
    }

    private async Task<CompanyUserDto> GetCompanyUser(Guid companyUserId, CancellationToken cancellationToken)
    {
        var companyUser = await _context.CompanyUsers
            .AsNoTracking()
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.Id == companyUserId, cancellationToken);

        return new CompanyUserDto
        {
            Id = companyUser.Id,
            FirstName = companyUser.User.FirstName,
            LastName = companyUser.User.LastName,
            Email = companyUser.User.Email,
        };
    }
}