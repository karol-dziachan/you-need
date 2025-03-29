using FluentValidation;

namespace KARacter.YouNeed.Application.Features.TestEntity.Commands.AddTestEntity
{
    public class AddTestEntityCommandValidator : AbstractValidator<AddTestEntityCommand>
    {
        public AddTestEntityCommandValidator()
        {
            RuleFor(x => x.Entity).NotNull().WithMessage("Entity must not be null.");
            // Add more validation rules as needed
        }
    }
}
