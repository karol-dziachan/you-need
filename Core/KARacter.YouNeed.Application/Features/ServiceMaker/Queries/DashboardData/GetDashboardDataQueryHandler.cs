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
        try
        {
            var email = _jwtService.ValidateToken(request.JwtToken);

            var role = _jwtService.GetUserRole(request.JwtToken);
            
            var user = await GetUserByEmail(email, cancellationToken);
            if (user is null)
            {
                return BuildErrorResult("Nie znaleziono użytkownika");
            }

            var companyUser = await GetCompanyUser(user.Id, cancellationToken);
            if (companyUser is null) 
            {
                return BuildErrorResult("Nie znaleziono użytkownika w firmie");
            }

            var company = await GetCompanyWithIncludes(companyUser.CompanyId, cancellationToken);
            if (company is null)
            {
                return BuildErrorResult("Nie znaleziono firmy");
            }

            var workSchedules = await GetWorkSchedules(company.Id, cancellationToken);
            var workAreas = await GetWorkAreas(company.Id, cancellationToken);
            var breakSettings = await GetBreakSettings(company.Id, cancellationToken);

            return new GetDashboardDataQueryResult
            {
                IsSuccess = true,
                Message = "Pomyślnie pobrano dane",
                DashboardData = BuildDashboardData(user, company, workSchedules, workAreas, breakSettings, role)
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Wystąpił błąd podczas pobierania danych dashboard");
            return BuildErrorResult("Wystąpił błąd podczas pobierania danych");
        }
    }

    private async Task<User?> GetUserByEmail(string email, CancellationToken cancellationToken)
    {
        return await _context.Users
            .Include(x => x.CompanyUser)
            .ThenInclude(x => x.Company)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Email == email, cancellationToken);
    }

    private async Task<CompanyUser?> GetCompanyUser(Guid userId, CancellationToken cancellationToken)
    {
        return await _context.CompanyUsers
            .Include(x => x.Company)
            .FirstOrDefaultAsync(x => x.UserId == userId, cancellationToken);
    }

    private async Task<Company?> GetCompanyWithIncludes(Guid companyId, CancellationToken cancellationToken)
    {
        return await _context.Companies
            .Include(x => x.BreakSettings)
            .Include(x => x.WorkAreas)
            .Include(x => x.WorkSchedules)
            .Include(x => x.CompanyUsers)
                .ThenInclude(x => x.User)
            .Include(x => x.CompanyUsers)
                .ThenInclude(x => x.UserRole)
            .FirstOrDefaultAsync(x => x.Id == companyId, cancellationToken);
    }

    private async Task<List<CompanyWorkSchedule>> GetWorkSchedules(Guid companyId, CancellationToken cancellationToken)
    {
        return await _context.CompanyWorkSchedules
            .Include(x => x.User)
            .Where(x => x.CompanyId == companyId)
            .ToListAsync(cancellationToken);
    }

    private async Task<List<CompanyWorkArea>> GetWorkAreas(Guid companyId, CancellationToken cancellationToken)
    {
        return await _context.CompanyWorkAreas
            .Include(x => x.User)
            .Where(x => x.CompanyId == companyId)
            .ToListAsync(cancellationToken);
    }

    private async Task<List<CompanyBreakSettings>> GetBreakSettings(Guid companyId, CancellationToken cancellationToken)
    {
        return await _context.CompanyBreakSettings
            .Include(x => x.User)
            .Where(x => x.CompanyId == companyId)
            .ToListAsync(cancellationToken);
    }

    private GetDashboardDataQueryResult BuildErrorResult(string message)
    {
        return new GetDashboardDataQueryResult
        {
            IsSuccess = false,
            Message = message,
            DashboardData = null
        };
    }

    private DashboardDataDto BuildDashboardData(User user, Company company, List<CompanyWorkSchedule> workSchedules, List<CompanyWorkArea> workAreas, List<CompanyBreakSettings> breakSettings, string role)
    {
        return new DashboardDataDto
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
                Id = company.Id,
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
            BreakSettings = breakSettings?
                .Where(x => role == "CompanyAdmin" || x.UserId == user.Id)
                .Select(x => new BreakSettingsDto
                {
                    Id = x.Id,
                    UserFullName = $"{x.User?.FirstName} {x.User?.LastName}",
                    CompanyId = x.CompanyId,
                    MinimumBreakBetweenOrdersInMinutes = x.MinimumBreakBetweenOrdersInMinutes,
                    MaximumOrdersPerDay = x.MaximumOrdersPerDay,
                    IsActive = x.IsActive,
                    AllowWeekendOrders = x.AllowWeekendOrders,
                    AllowHolidayOrders = x.AllowHolidayOrders,
                    ExcludedDates = x.ExcludedDates,
                    SpecialBreakRules = x.SpecialBreakRules
                })?.ToList() ?? new List<BreakSettingsDto>(),
            CompanyUsers = company.CompanyUsers?
            .Where(x => role == "CompanyAdmin" || x.UserId == user.Id)
            .Select(x => new CompanyUserDto
            {
                Id = x.Id,
                Email = x.User?.Email,
                FirstName = x.User?.FirstName,
                LastName = x.User?.LastName,
                PhoneNumber = x.User?.PhoneNumber,
                Role = x.UserRole?.Name,
                IsActive = x.IsActive
            })?.ToList() ?? new List<CompanyUserDto>(),
            WorkAreas = workAreas?
                .Where(x => role == "CompanyAdmin" || x.UserId == user.Id)
            .Select(x => new WorkAreaDto
            {
                Id = x.Id,
                UserFullName = $"{x.User?.FirstName} {x.User?.LastName}",
                City = x.City,
                PostalCode = x.PostalCode,
                District = x.District,
                RadiusInKm = x.RadiusInKm,
                AdditionalInfo = x.AdditionalInfo,
                IsActive = x.IsActive
            })?.ToList() ?? new List<WorkAreaDto>(),
            WorkSchedules = workSchedules?
            .Where(x => role == "CompanyAdmin" || x.User.UserId == user.Id)
            .Select(x => new WorkScheduleDto
            {
                Id = x.Id,
                CompanyUserId = x.UserId,
                DayOfWeek = x.DayOfWeek,
                StartTime = x.StartTime,
                EndTime = x.EndTime,
                IsBreakTime = x.IsBreakTime,
                IsActive = x.IsActive,
                BreakStartTime = x.BreakStartTime,
                BreakEndTime = x.BreakEndTime,
                Notes = x.Notes,
                UserFullName = $"{x.User?.User?.FirstName} {x.User?.User?.LastName}"
            })?.ToList() ?? new List<WorkScheduleDto>()
        };
    }
}