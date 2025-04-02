using System.Text.Json;
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

    [HttpGet("{companyId}")]
    public async Task<IActionResult> Get([FromRoute] Guid companyId)
    {
        _logger.LogInformation("Getting offers for provider with ID: {CompanyId}", companyId);
        var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        var result = await _mediator.Send(new GetOffersForProviderQuery { CompanyId = companyId, Token = token });
        if (result.IsSuccess)
        {
            _logger.LogInformation("Successfully retrieved {Count} offers for provider", result.OffersForCompany.Count());
            return Ok(result);
        }
        _logger.LogWarning("Failed to get offers for provider. Error: {Message}", result.Message);
        return BadRequest(result.Message);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,CompanyAdmin")]
    public async Task<IActionResult> Post([FromBody] AddEntityOfferCommand command)
    {
        _logger.LogInformation("Adding entity offer with command: {Command}", JsonSerializer.Serialize(command));
        
        if (command == null)
        {
            _logger.LogWarning("Command is null");
            return BadRequest("Dane nie mogą być puste");
        }
        
        if (command.AddEntityOfferDtos == null || command.AddEntityOfferDtos.Count == 0)
        {
            _logger.LogWarning("Attempted to add entity offer with empty DTOs list");
            return BadRequest("Lista ofert nie może być pusta");
        }
        
        try
        {
            _logger.LogInformation("Adding entity offer for entity {entityType} with ID {entityId} ", command.AddEntityOfferDtos.First().WhichEntity, command.AddEntityOfferDtos.First().EntityId);
            var result = await _mediator.Send(command);
            _logger.LogInformation("Result: {Result}", JsonSerializer.Serialize(result));
            
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            
            _logger.LogWarning("Failed to add entity offer. Error: {Message}", result.Message);
            return BadRequest(result.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding entity offer");
            return BadRequest($"Wystąpił błąd podczas dodawania oferty: {ex.Message}");
        }
    }
    
    [HttpPut]
    [Authorize(Roles = "Admin,CompanyAdmin")]
    public async Task<IActionResult> Put([FromBody] EditEntityOfferCommand command)
    {
        if (command is null)
        {
            _logger.LogWarning("Edit entity offer command was null");
            return BadRequest("Request body cannot be null");
        }

        _logger.LogInformation("Editing entity offer with ID: {Id}", command.Id);
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
        {
            _logger.LogInformation("Successfully edited entity offer with ID: {Id}", command.Id);
            return Ok(result);
        }
        _logger.LogWarning("Failed to edit entity offer. Error: {Message}", result.Message);
        return BadRequest(result.Message);
    }
    
    [HttpDelete]
    [Authorize(Roles = "Admin,CompanyAdmin")]
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