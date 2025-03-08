using KARacter.YouNeed.Application.Common.Abstractions;

namespace KARacter.YouNeed.Application.Features.TestEntity.Commands.AddTestEntity
{
    public sealed class AddTestEntityCommandResult : BaseResult
    {
        public Guid? NewEntityId { get; set; }

        public AddTestEntityCommandResult(bool success, string message, Guid? newEntityId) : base(success, message)
        {
            NewEntityId = newEntityId;
        }
    }
}
