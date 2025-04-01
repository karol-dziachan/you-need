using KARacter.YouNeed.Api.Abstraction;
using KARacter.YouNeed.Application.Features.Offer.Commands.CreateOffer;
using KARacter.YouNeed.Application.Features.Offer.Commands.DeleteOffer;
using KARacter.YouNeed.Application.Features.Offer.Commands.EditOffer;
using KARacter.YouNeed.Application.Features.Offer.Queries.GetAllOffers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KARacter.YouNeed.Api.Controllers;

[Route("api/v1.0/offers")]
[ApiController]
public class OffersController : BaseController
{
    private readonly IMediator _mediator;
    private readonly ILogger<OffersController> _logger;

    public OffersController(IMediator mediator, ILogger<OffersController> logger)
    {
        _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet]

    public async Task<IActionResult> Get()
    {
        var result = await _mediator.Send(new GetAllOffersQuery());
        if (result.IsSuccess)
        {
            return Ok(result);
        }
        return BadRequest(result.Message);
    }
    

    [HttpPost]
    [Authorize(Roles = "Admin,CompanyAdmin")]
    public async Task<IActionResult> Post([FromBody] CreateOfferCommand command)
    {
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
        {
            return Ok(result);
        }
        return BadRequest(result);
    }

    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Put([FromBody] EditOfferCommand command)
    {
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
        {
            return Ok(result);
        }
        return BadRequest(result);
    }

    [HttpDelete]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete([FromBody] DeleteOfferCommand command)
    {
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
        {
            return Ok(result);
        }
        return BadRequest(result);
    }
}
