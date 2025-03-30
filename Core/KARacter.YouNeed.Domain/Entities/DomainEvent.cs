namespace KARacter.YouNeed.Domain.Entities;

public class DomainEvent
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedDateTime { get; set; } = DateTime.UtcNow;
    public DateTime? HandledDateTime { get; set; }
    public bool IsHandled { get; set; }
    public string? EventType { get; set; }
    public string? EventData { get; set; }
    public string? EventSource { get; set; }
    public string? EventResult { get; set; }
    public string? EventError { get; set; }
    public int RetryCount { get; set; }
}
