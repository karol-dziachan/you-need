using FluentValidation;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyWorkArea;

public class DeleteCompanyWorkAreaCommandValidator : AbstractValidator<DeleteCompanyWorkAreaCommand>
{
    public DeleteCompanyWorkAreaCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Identyfikator obszaru roboczego jest wymagany.");

        RuleFor(x => x.CompanyId)
            .NotEmpty()
            .WithMessage("Identyfikator firmy jest wymagany.");
    }
} 