namespace KARacter.YouNeed.Application.Features.ServiceMaker.Queries.GetCompanyWorkAreas;

public record GetCompanyWorkAreasResponse
{
    public required bool IsSuccess { get; init; }
    public string? Message { get; init; }
    public IEnumerable<CompanyWorkAreaDto> WorkAreas { get; init; } = Enumerable.Empty<CompanyWorkAreaDto>();
}

public record CompanyWorkAreaDto
{
    public required Guid Id { get; init; }
    public required string UserFullName { get; init; }
    public required string City { get; init; }
    public required string PostalCode { get; init; }
    public required string District { get; init; }
    public decimal? RadiusInKm { get; init; }
    public string? AdditionalInfo { get; init; }
    public bool IsActive { get; init; }
} 