using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Queries.DashboardData;

public class GetDashboardDataQueryHandler : IRequestHandler<GetDashboardDataQuery, GetDashboardDataQueryResult>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<GetDashboardDataQueryHandler> _logger;
    private readonly IJWTService _jwtService;


    public GetDashboardDataQueryHandler(IYouNeedDbContext context, ILogger<GetDashboardDataQueryHandler> logger, IJWTService jwtService)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _jwtService = jwtService ?? throw new ArgumentNullException(nameof(jwtService));
    }
    public async Task<GetDashboardDataQueryResult> Handle(GetDashboardDataQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Received dashboard data request");
        _logger.LogInformation("Token: {Token}", request.JwtToken);
        var token = request.JwtToken;
        var email = _jwtService.ValidateToken(token);
        User user = null;
        try
        {
            _logger.LogInformation("Email: {Email}", email);
             user = await _context
                .Users
                .Include(x => x.CompanyUser)
                .ThenInclude(x => x.Company)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Email == email, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while fetching user data");
            throw;
        }
        _logger.LogInformation("User: {User}", user);
        if (user is null)
        {
            _logger.LogInformation("User not found");
            return new GetDashboardDataQueryResult
            {
                IsSuccess = false,
                Message = "Nie znaleziono użytkownika",
                DashboardData = null
            };
        }

        var companyUser = await _context
            .CompanyUsers
            .Include(x => x.Company)
            .FirstOrDefaultAsync(x => x.UserId == user.Id, cancellationToken);

        if (companyUser is null)
        {
            _logger.LogInformation("Company user not found");
            return new GetDashboardDataQueryResult
            {
                IsSuccess = false,
                Message = "Nie znaleziono użytkownika w firmie",
                DashboardData = null
            };
        }

        var company = await _context
            .Companies
            .Include(x => x.BreakSettings)
            .Include(x => x.WorkAreas)
            .Include(x => x.WorkSchedules)
            .Include(x => x.CompanyUsers)
            .ThenInclude(x => x.User)
            .Include(x => x.CompanyUsers)
            .ThenInclude(x => x.UserRole)
            .FirstOrDefaultAsync(x => x.Id == companyUser.CompanyId, cancellationToken);

        if (company is null)
        {
            _logger.LogInformation("Company not found");
            return new GetDashboardDataQueryResult
            {
                IsSuccess = false,
                Message = "Nie znaleziono firmy",
                DashboardData = null
            };
        }

        _logger.LogInformation("Company found");
        _logger.LogInformation("Company: {Company}", company);
        var result = new GetDashboardDataQueryResult
        {
            IsSuccess = true,
            Message = "Pomyślnie pobrano dane",
            DashboardData = new DashboardDataDto
            {
                User = new UserDto
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    LastLoginDate = user.LastLoginDate
                },
                Company = new CompanyDto
                {
                    Name = company.Name,
                    NIP = company.NIP,
                    REGON = company.REGON,
                    Address = company.Address,
                    City = company.City,
                    PostalCode = company.PostalCode,
                    PhoneNumber = company.PhoneNumber,
                    Email = company.Email,
                    Website = company.Website,
                    Description = company.Description,
                    IsActive = company.IsActive
                },
                BreakSettings = company.BreakSettings is not null ? new BreakSettingsDto
                {
                    MinimumBreakBetweenOrdersInMinutes = company.BreakSettings.MinimumBreakBetweenOrdersInMinutes,
                    MaximumOrdersPerDay = company.BreakSettings.MaximumOrdersPerDay,
                    IsActive = company.BreakSettings.IsActive,
                    AllowWeekendOrders = company.BreakSettings.AllowWeekendOrders,
                    AllowHolidayOrders = company.BreakSettings.AllowHolidayOrders,
                    ExcludedDates = company.BreakSettings.ExcludedDates,
                    SpecialBreakRules = company.BreakSettings.SpecialBreakRules
                } : null,
                CompanyUsers = company.CompanyUsers?.Select(x => new CompanyUserDto
                {
                    Email = x.User?.Email,
                    FirstName = x.User?.FirstName,
                    LastName = x.User?.LastName,
                    PhoneNumber = x.User?.PhoneNumber
                })?.ToList() ?? new List<CompanyUserDto>(),
                WorkAreas = company.WorkAreas?.Select(x => new WorkAreaDto
                {
                    City = x.City,
                    PostalCode = x.PostalCode,
                    District = x.District,
                    RadiusInKm = x.RadiusInKm,
                    AdditionalInfo = x.AdditionalInfo,
                    IsActive = x.IsActive
                })?.ToList() ?? new List<WorkAreaDto>(),
                WorkSchedules = company.WorkSchedules?.Select(x => new WorkScheduleDto
                {
                    DayOfWeek = x.DayOfWeek,
                    StartTime = x.StartTime,
                    EndTime = x.EndTime,
                    IsBreakTime = x.IsBreakTime,
                    IsActive = x.IsActive,
                    BreakStartTime = x.BreakStartTime,
                    BreakEndTime = x.BreakEndTime,
                    Notes = x.Notes
                })?.ToList() ?? new List<WorkScheduleDto>()
            }
        };

        return result;
    }
}