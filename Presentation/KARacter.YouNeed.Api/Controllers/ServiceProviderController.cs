using KARacter.YouNeed.Api.Abstraction;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.RegisterServiceMaker;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.ActivateServiceMakerAcoount;
using Microsoft.Extensions.Logging;

namespace KARacter.YouNeed.Api.Controllers
{
    [Route("api/v1.0/service-provider")]
    [ApiController]
    public class ServiceProviderController : BaseController
    {
        private readonly ILogger<ServiceProviderController> _logger;
        private readonly IMediator _mediator;

        public ServiceProviderController(ILogger<ServiceProviderController> logger, IMediator mediator) : base()
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok("Hello World");
        }
        /// <summary>
        /// Registers a new service provider in the system.
        /// </summary>
        /// <param name="command">The registration command containing:
        /// - Company details (name, NIP, REGON, contact info)
        /// - Company administrator details (name, email, password)
        /// - Service areas with radius in kilometers
        /// </param>
        /// <remarks>
        /// Sample request:
        /// POST /api/v1.0/service-provider
        /// {
        ///     "companyName": "Example Company",
        ///     "nip": "1234567890",
        ///     "regon": "123456789",
        ///     "email": "example@company.com",
        ///     "website": "www.example.com",
        ///     "description": "Company description",
        ///     "phoneNumber": "+48123456789",
        ///     "address": "Example Street 1",
        ///     "city": "Warsaw",
        ///     "postalCode": "00-001",
        ///     "password": "SecurePassword123!",
        ///     "confirmPassword": "SecurePassword123!",
        ///     "firstName": "John",
        ///     "lastName": "Doe",
        ///     "workAreas": [
        ///         {
        ///             "city": "Warsaw",
        ///             "postalCode": "00-001",
        ///             "district": "Śródmieście",
        ///             "radiusInKm": 10
        ///         }
        ///     ]
        /// }
        /// </remarks>
        /// <returns>Returns RegisterServiceProviderCommandResult containing operation status and newly created company ID</returns>
        /// <response code="200">Returns the registration result with company ID</response>
        /// <response code="400">If the registration failed</response>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RegisterServiceProviderCommand command)
        {
            _logger.LogInformation("Received registration request for company: {CompanyName}, Email: {Email}", 
                command.CompanyName, command.Email);

            _logger.LogDebug("Full registration request details: {@Command}", command);

            try
            {
                _logger.LogTrace("Sending registration command to mediator");
                var result = await _mediator.Send(command);

                if (result.IsSuccess)
                {
                    _logger.LogInformation("Successfully registered company {CompanyName} with ID: {CompanyId}", 
                        command.CompanyName, result.Id);
                    return Ok(result);
                }

                _logger.LogWarning("Registration failed for company {CompanyName}. Reason: {Message}", 
                    command.CompanyName, result.Message);
                return BadRequest(result.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during registration for company {CompanyName}", 
                    command.CompanyName);
                throw;
            }
        }

        [HttpPut("activate/{id}")]
        public async Task<IActionResult> Activate([FromRoute] Guid id)
        {
            var result = await _mediator.Send(new ActivateServiceMakerAcoountCommand { Id = id });

            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result.Message);
        }


    }
}
