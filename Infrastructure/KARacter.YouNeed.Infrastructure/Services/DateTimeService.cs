using KARacter.YouNeed.Application.Common.Interfaces;

namespace KARacter.YouNeed.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
