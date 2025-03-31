using FluentValidation;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyWorkArea;

public class EditCompanyWorkAreaCommandValidator : AbstractValidator<EditCompanyWorkAreaCommand>
{
    public EditCompanyWorkAreaCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Identyfikator obszaru roboczego jest wymagany.");

        RuleFor(x => x.CompanyId)
            .NotEmpty()
            .WithMessage("Identyfikator firmy jest wymagany.");

        RuleFor(x => x.City)
            .NotEmpty()
            .WithMessage("Miasto jest wymagane.")
            .MaximumLength(100)
            .WithMessage("Nazwa miasta nie może przekraczać 100 znaków.");

        RuleFor(x => x.PostalCode)
            .NotEmpty()
            .WithMessage("Kod pocztowy jest wymagany.")
            .Matches(@"^\d{2}-\d{3}$")
            .WithMessage("Nieprawidłowy format kodu pocztowego (XX-XXX).");

        RuleFor(x => x.District)
            .NotEmpty()
            .WithMessage("Dzielnica jest wymagana.")
            .MaximumLength(100)
            .WithMessage("Nazwa dzielnicy nie może przekraczać 100 znaków.");

        RuleFor(x => x.RadiusInKm)
            .GreaterThan(0)
            .When(x => x.RadiusInKm.HasValue)
            .WithMessage("Promień musi być większy niż 0 km.");

        RuleFor(x => x.AdditionalInfo)
            .MaximumLength(1000)
            .When(x => !string.IsNullOrEmpty(x.AdditionalInfo))
            .WithMessage("Dodatkowe informacje nie mogą przekraczać 1000 znaków.");
    }
} 