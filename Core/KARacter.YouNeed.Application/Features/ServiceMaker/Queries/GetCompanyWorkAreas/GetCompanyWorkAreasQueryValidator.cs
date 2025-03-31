using FluentValidation;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Queries.GetCompanyWorkAreas;

public class GetCompanyWorkAreasQueryValidator : AbstractValidator<GetCompanyWorkAreasQuery>
{
    public GetCompanyWorkAreasQueryValidator()
    {
        RuleFor(x => x.CompanyId)
            .NotEmpty()
            .WithMessage("Identyfikator firmy jest wymagany.");
    }
} 