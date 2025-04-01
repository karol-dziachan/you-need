using KARacter.YouNeed.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Queries.GetCompanyWorkAreas;

public class GetCompanyWorkAreasQueryHandler : IRequestHandler<GetCompanyWorkAreasQuery, GetCompanyWorkAreasResponse>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<GetCompanyWorkAreasQueryHandler> _logger;

    public GetCompanyWorkAreasQueryHandler(
        IYouNeedDbContext context,
        ILogger<GetCompanyWorkAreasQueryHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<GetCompanyWorkAreasResponse> Handle(GetCompanyWorkAreasQuery request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Rozpoczęto pobieranie obszarów roboczych dla firmy: {CompanyId}", request.CompanyId);

            var query = _context.CompanyWorkAreas
                .Include(x => x.User)
                .Where(x => x.CompanyId == request.CompanyId);

            if (request.IsActive.HasValue)
            {
                query = query.Where(x => x.IsActive == request.IsActive.Value);
            }

            var workAreas = await query
                .Select(x => new CompanyWorkAreaDto
                {
                    Id = x.Id,
                    UserFullName = $"{x.User.FirstName} {x.User.LastName}",
                    City = x.City,
                    PostalCode = x.PostalCode,
                    District = x.District,
                    RadiusInKm = x.RadiusInKm,
                    AdditionalInfo = x.AdditionalInfo,
                    IsActive = x.IsActive
                })
                .OrderBy(x => x.UserFullName)
                .ThenBy(x => x.City)
                .ToListAsync(cancellationToken);

            _logger.LogInformation("Pomyślnie pobrano {Count} obszarów roboczych dla firmy: {CompanyId}", 
                workAreas.Count, request.CompanyId);

            return new GetCompanyWorkAreasResponse
            {
                IsSuccess = true,
                WorkAreas = workAreas
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Wystąpił błąd podczas pobierania obszarów roboczych dla firmy: {CompanyId}", 
                request.CompanyId);
            return new GetCompanyWorkAreasResponse
            {
                IsSuccess = false,
                Message = "Wystąpił błąd podczas pobierania obszarów roboczych."
            };
        }
    }
} 