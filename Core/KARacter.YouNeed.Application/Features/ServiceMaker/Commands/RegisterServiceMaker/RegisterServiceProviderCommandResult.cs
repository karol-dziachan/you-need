namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.RegisterServiceMaker;

public class RegisterServiceProviderCommandResult
{
    public string Message { get; init; } = string.Empty;
    public bool IsSuccess { get; init; }
    public Guid? Id { get; init; }
}


/*
 *
 *using FluentValidation;
   
   namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.RegisterServiceMaker;
   
   public class RegisterServiceProviderCommandValidator : AbstractValidator<RegisterServiceProviderCommand>
   {
       public RegisterServiceProviderCommandValidator()
       {
           RuleFor(x => x.CompanyName)
               .NotEmpty().WithMessage("Nazwa firmy jest wymagana")
               .MaximumLength(200).WithMessage("Nazwa firmy nie może przekraczać 200 znaków");
   
           RuleFor(x => x.NIP)
               .NotEmpty().WithMessage("NIP jest wymagany")
               .Length(10).WithMessage("NIP musi mieć 10 znaków")
               .Matches(@"^\d{10}$").WithMessage("NIP może zawierać tylko cyfry");
   
           RuleFor(x => x.REGON)
               .Length(9).WithMessage("REGON musi mieć 9 znaków")
               .Matches(@"^\d{9}$").WithMessage("REGON może zawierać tylko cyfry")
               .When(x => !string.IsNullOrEmpty(x.REGON));
   
           RuleFor(x => x.Email)
               .NotEmpty().WithMessage("Email jest wymagany")
               .EmailAddress().WithMessage("Nieprawidłowy format adresu email");
   
           RuleFor(x => x.Website)
               .Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out _))
               .When(x => !string.IsNullOrEmpty(x.Website))
               .WithMessage("Nieprawidłowy format adresu strony internetowej");
   
           RuleFor(x => x.PhoneNumber)
               .Matches(@"^\+?[1-9]\d{1,14}$")
               .When(x => !string.IsNullOrEmpty(x.PhoneNumber))
               .WithMessage("Nieprawidłowy format numeru telefonu");
   
           RuleFor(x => x.Address)
               .NotEmpty().WithMessage("Adres jest wymagany")
               .MaximumLength(200).WithMessage("Adres nie może przekraczać 200 znaków");
   
           RuleFor(x => x.City)
               .NotEmpty().WithMessage("Miasto jest wymagane")
               .MaximumLength(100).WithMessage("Nazwa miasta nie może przekraczać 100 znaków");
   
           RuleFor(x => x.PostalCode)
               .NotEmpty().WithMessage("Kod pocztowy jest wymagany")
               .Matches(@"^\d{2}-\d{3}$").WithMessage("Nieprawidłowy format kodu pocztowego (XX-XXX)");
   
           RuleFor(x => x.Password)
               .NotEmpty().WithMessage("Hasło jest wymagane")
               .MinimumLength(8).WithMessage("Hasło musi mieć minimum 8 znaków")
               .Matches(@"[A-Z]").WithMessage("Hasło musi zawierać przynajmniej jedną wielką literę")
               .Matches(@"[a-z]").WithMessage("Hasło musi zawierać przynajmniej jedną małą literę")
               .Matches(@"[0-9]").WithMessage("Hasło musi zawierać przynajmniej jedną cyfrę")
               .Matches(@"[!@#$%^&*(),.?""':{}|<>]").WithMessage("Hasło musi zawierać przynajmniej jeden znak specjalny");
   
           RuleFor(x => x.ConfirmPassword)
               .Equal(x => x.Password).WithMessage("Hasła muszą być identyczne");
   
           RuleFor(x => x.FirstName)
               .NotEmpty().WithMessage("Imię jest wymagane")
               .MaximumLength(50).WithMessage("Imię nie może przekraczać 50 znaków");
   
           RuleFor(x => x.LastName)
               .NotEmpty().WithMessage("Nazwisko jest wymagane")
               .MaximumLength(50).WithMessage("Nazwisko nie może przekraczać 50 znaków");
   
           RuleFor(x => x.WorkAreas)
               .NotEmpty().WithMessage("Przynajmniej jeden obszar działania jest wymagany");
   
           RuleForEach(x => x.WorkAreas).ChildRules(workArea => 
           {
               workArea.RuleFor(x => x.City)
                   .NotEmpty().WithMessage("Miasto jest wymagane")
                   .MaximumLength(100).WithMessage("Nazwa miasta nie może przekraczać 100 znaków");
   
               workArea.RuleFor(x => x.PostalCode)
                   .NotEmpty().WithMessage("Kod pocztowy jest wymagany")
                   .Matches(@"^\d{2}-\d{3}$").WithMessage("Nieprawidłowy format kodu pocztowego (XX-XXX)");
   
               workArea.RuleFor(x => x.District)
                   .NotEmpty().WithMessage("Dzielnica jest wymagana")
                   .MaximumLength(100).WithMessage("Nazwa dzielnicy nie może przekraczać 100 znaków");
   
               workArea.RuleFor(x => x.RadiusInKm)
                   .GreaterThan(0).WithMessage("Promień musi być większy niż 0")
                   .LessThanOrEqualTo(100).WithMessage("Promień nie może przekraczać 100 km");
   
               workArea.RuleFor(x => x.AdditionalInfo)
                   .MaximumLength(500).WithMessage("Dodatkowe informacje nie mogą przekraczać 500 znaków")
                   .When(x => !string.IsNullOrEmpty(x.AdditionalInfo));
           });
       }
   }
 * 
 */