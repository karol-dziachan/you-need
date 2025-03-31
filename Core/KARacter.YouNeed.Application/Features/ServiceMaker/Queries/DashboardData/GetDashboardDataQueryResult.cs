namespace KARacter.YouNeed.Application.Features.ServiceMaker.Queries.DashboardData;

public class GetDashboardDataQueryResult
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
    public DashboardDataDto DashboardData { get; set; }
}

public class DashboardDataDto
{
    public UserDto User { get; set; }
    public CompanyDto Company { get; set; }
    public BreakSettingsDto BreakSettings { get; set; }
    public List<CompanyUserDto> CompanyUsers { get; set; }
    public List<WorkAreaDto> WorkAreas { get; set; }
    public List<WorkScheduleDto> WorkSchedules { get; set; }
}

public class UserDto
{
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime? LastLoginDate { get; set; }
}

public class CompanyDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string NIP { get; set; }
    public string REGON { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string PostalCode { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Website { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }    
}


public class BreakSettingsDto
{
    public Guid Id { get; set; }
    public required int MinimumBreakBetweenOrdersInMinutes { get; init; }
    public required int MaximumOrdersPerDay { get; init; }
    public bool IsActive { get; init; } = true;
    public bool AllowWeekendOrders { get; init; }
    public bool AllowHolidayOrders { get; init; }
        public string? ExcludedDates { get; init; } // JSON z listą wykluczonych dat
        public string? SpecialBreakRules { get; init; } // JSON z dodatkowymi regułami przerw
}

public class CompanyUserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public string Role { get; set; }
    public bool IsActive { get; set; }
}

public class WorkAreaDto
{
    public Guid Id { get; set; }
    public string City { get; set; }
    public string PostalCode { get; set; }
    public string District { get; set; }
    public decimal? RadiusInKm { get; set; }
    public string? AdditionalInfo { get; set; }
    public bool IsActive { get; set; }
}

public class WorkScheduleDto
{
    public Guid Id { get; set; }
    public Guid CompanyUserId { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public bool IsBreakTime { get; set; }
    public bool IsActive { get; set; }
    public TimeSpan? BreakStartTime { get; set; }
    public TimeSpan? BreakEndTime { get; set; }
    public string? Notes { get; set; }
    public string UserFullName { get; set; }
}

