using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.UpdateContactInfo;

public class UpdateContactInfoCommandHandler : IRequestHandler<UpdateContactInfoCommand, UpdateContactInfoCommandResult>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<UpdateContactInfoCommandHandler> _logger;

    public UpdateContactInfoCommandHandler(IYouNeedDbContext context, ILogger<UpdateContactInfoCommandHandler> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<UpdateContactInfoCommandResult> Handle(UpdateContactInfoCommand request, CancellationToken cancellationToken)
    {
        _logger.LogTrace("Updating contact info for company {CompanyId}", request.CompanyId);

        try
        {
            var company = await _context.Companies.FindAsync(request.CompanyId);
            if (company == null)
            {
                _logger.LogError("Company not found");
                return new UpdateContactInfoCommandResult { IsSuccess = false, Message = "Firma nie znaleziona" };
            }

            company.Name = request.CompanyName;
            company.NIP = request.CompanyNIP;
            company.REGON = request.CompanyREGON;
            company.Description = request.CompanyDescription;
            company.Address = request.CompanyAddress;
            company.City = request.CompanyCity;
            company.PostalCode = request.CompanyPostalCode;
            company.PhoneNumber = request.CompanyPhoneNumber;
            company.Website = request.CompanyWebsite;
            company.ModifiedDateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Europe/Warsaw"));

            await _context.SaveChangesAsync(cancellationToken);

            return new UpdateContactInfoCommandResult { IsSuccess = true, Message = "Dane kontaktowe zaktualizowane pomyślnie" };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating contact info for company {CompanyId}", request.CompanyId);
            return new UpdateContactInfoCommandResult { IsSuccess = false, Message = "Wystąpił błąd podczas aktualizacji danych kontaktowych" };
        }
    }
}