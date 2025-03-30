namespace KARacter.YouNeed.Domain.Events;

public class ServiceProviderRegisteredEvent 
{
    public Guid Id { get; init; }
    public required string Email { get; init; }
    public required string CompanyName { get; init; }
    public required string ActivationLink { get; init; }
}