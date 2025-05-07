using KARacter.YouNeed.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Application.Features.ServiceMaker.Commands.ActivateServiceMakerAcoount;

public class ActivateServiceMakerAcoountCommandHandler : IRequestHandler<ActivateServiceMakerAcoountCommand, ActivateServiceMakerAcoountCommandResult>
{
    private readonly IYouNeedDbContext _context;
    private readonly ILogger<ActivateServiceMakerAcoountCommandHandler> _logger;
    public ActivateServiceMakerAcoountCommandHandler(IYouNeedDbContext context, ILogger<ActivateServiceMakerAcoountCommandHandler> logger)
    {
        _context = context;
        _logger = logger;
    }
    public async Task<ActivateServiceMakerAcoountCommandResult> Handle(ActivateServiceMakerAcoountCommand request, CancellationToken cancellationToken)
    {
        _logger.LogTrace("ActivateServiceMakerAcoountCommandHandler: Handle, Request: {@Request}", request);

        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (user is null)
        {
            _logger.LogError("ActivateServiceMakerAcoountCommandHandler: Handle, User not found, Request: {@Request}", request);
            return new ActivateServiceMakerAcoountCommandResult
            {
                IsSuccess = false,
                Message = "Użytkownik nie znaleziony"
            };
        }

        user.IsActive = true;
        user.IsEmailConfirmed = true;
        await _context.SaveChangesAsync(cancellationToken);

        return new ActivateServiceMakerAcoountCommandResult
        {
            IsSuccess = true,
            Message = "Konto zostało aktywowane"
        };
    }   
}