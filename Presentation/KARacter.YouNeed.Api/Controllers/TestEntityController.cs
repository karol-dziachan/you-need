using KARacter.YouNeed.Api.Abstraction;
using KARacter.YouNeed.Application.Features.TestEntity.Commands.AddTestEntity;
using KARacter.YouNeed.Application.Features.TestEntity.Queries.GetTestEntities;
using Microsoft.AspNetCore.Mvc;

namespace KARacter.YouNeed.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TestEntityController : BaseController
    {
        /// <summary>
        /// Retrieves all TestEntities.
        /// </summary>
        /// <returns>A list of TestEntities.</returns>
        /// <response code="200">Returns the list of TestEntities.</response>
        /// <response code="400">If the request is invalid.</response>
        /// <response code="403">If the user is unauthorized.</response>
        /// <response code="404">If no TestEntities were found.</response>
        [HttpGet("get-all")]
        [ProducesResponseType(typeof(GetAllTestEntitiesQueryResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GetAllTestEntitiesQueryResult>> GetAllTestEntities()
        {
            var query = new GetAllTestEntitiesQuery();
            var response = await Mediator.Send(query);

            if (response == null || !response.Success)
            {
                return BadRequest(response);
            }

            if (!response.Data.Any())
            {
                return NotFound("No TestEntities found.");
            }

            return Ok(response);
        }

        /// <summary>
        /// Creates a new TestEntity.
        /// </summary>
        /// <param name="command">The command containing the data for the new TestEntity.</param>
        /// <returns>The result of the creation, including the new entity ID.</returns>
        /// <response code="200">If the TestEntity was successfully added.</response>
        /// <response code="400">If the request data is invalid.</response>
        /// <response code="403">If the user is unauthorized.</response>
        [HttpPost("add")]
        [ProducesResponseType(typeof(AddTestEntityCommandResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<AddTestEntityCommandResult>> AddTestEntity([FromBody] AddTestEntityCommand command)
        {
            if (command == null)
            {
                return BadRequest("Request body cannot be null.");
            }

            var result = await Mediator.Send(command);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
