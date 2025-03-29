using KARacter.YouNeed.Application.Common.Abstractions;

namespace KARacter.YouNeed.Infrastructure.Middlewares
{
    public class RequestResult : BaseResult
    {
        public RequestResult(bool success, string message) : base(success, message) { }
    }
}
