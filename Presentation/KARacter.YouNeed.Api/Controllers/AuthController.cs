using KARacter.YouNeed.Application.Features.Login.Queries.Login;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace KARacter.YouNeed.Api.Controllers;

[Route("api/v1.0/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Loguje użytkownika do systemu
    /// </summary>
    /// <param name="query">Dane logowania zawierające email i hasło</param>
    /// <returns>Token JWT w przypadku poprawnego uwierzytelnienia</returns>
    /// <response code="200">Zwraca token JWT</response>
    /// <response code="401">Nieprawidłowe dane logowania</response>
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginQuery query)
    {
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
        {
            return Ok(result);
        }
        return Unauthorized(result.Message);
    }
    
}
