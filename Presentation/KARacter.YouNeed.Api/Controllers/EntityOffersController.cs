using KARacter.YouNeed.Api.Abstraction;
using KARacter.YouNeed.Application.Features.EntityOffer.Commands.AddEntityOffer;
using KARacter.YouNeed.Application.Features.EntityOffer.Commands.DeleteEntityOffer;
using KARacter.YouNeed.Application.Features.EntityOffer.Commands.EditEntityOffer;
using KARacter.YouNeed.Application.Features.EntityOffer.Queries.GetOffersForProvider;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KARacter.YouNeed.Api.Controllers;

[Route("api/v1.0/entity-offers")]
[ApiController]
public class EntityOffersController : BaseController
{
    private readonly IMediator _mediator;
    private readonly ILogger<EntityOffersController> _logger;

    public EntityOffersController(IMediator mediator, ILogger<EntityOffersController> logger)
    {
        _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetOffersForProviderQuery query)
    {
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
        {
            return Ok(result.OffersForCompany);
        }
        return BadRequest(result.Message);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,CompanyAdmin")]
    public async Task<IActionResult> Post([FromBody] AddEntityOfferCommand command)
    {
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
        {
            return Ok(result);
        }
        return BadRequest(result.Message);
    }
    
    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Put([FromBody] EditEntityOfferCommand command)
    {
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
        {
            return Ok(result);
        }
        return BadRequest(result.Message);
    }
    
    [HttpDelete]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete([FromBody] DeleteEntityOfferCommand command)
    {
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
        {
            return Ok(result);
        }
        return BadRequest(result.Message);
    }
}