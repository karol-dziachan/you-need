namespace KARacter.YouNeed.Persistence.Exceptions;

public class ResourceUnavailableException : Exception
{
    public ResourceUnavailableException(string message) : base(message)
    {
    }

    public ResourceUnavailableException(string message, Exception innerException) 
        : base(message, innerException)
    {
    }
} 