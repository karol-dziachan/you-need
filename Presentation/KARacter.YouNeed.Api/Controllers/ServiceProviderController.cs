using KARacter.YouNeed.Api.Abstraction;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.RegisterServiceMaker;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.ActivateServiceMakerAcoount;
using Microsoft.Extensions.Logging;
using KARacter.YouNeed.Application.Features.ServiceMaker.Queries.DashboardData;
using Microsoft.AspNetCore.Authorization;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.UpdateContactInfo;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyUser;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyUser;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyUser;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.ActivateCompanyUser;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyWorkSchedule;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyWorkSchedule;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyWorkSchedule;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyWorkArea;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyWorkArea;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyWorkArea;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.AddCompanyBreakSettings;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.EditCompanyBreakSettings;
using KARacter.YouNeed.Application.Features.ServiceMaker.Commands.DeleteCompanyBreakSettings;

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

        [HttpGet("dashboard-data")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> GetDashboardData()
        {
            _logger.LogInformation("Received dashboard data request");
            var authHeader = Request.Headers["Authorization"].ToString();
            var token = authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase) 
                ? authHeader[7..] 
                : authHeader;

            
            var result = await _mediator.Send(new GetDashboardDataQuery { JwtToken = token });

            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result.Message);
        }

        [HttpPut("update-contact-info")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> UpdateContactInfo([FromBody] UpdateContactInfoCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


        [HttpPost("add-company-user")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> AddCompanyUser([FromBody] AddCompanyUserCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


        [HttpPut("edit-company-user")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> EditCompanyUser([FromBody] EditCompanyUserCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete("delete-company-user")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> DeleteCompanyUser([FromBody] DeleteCompanyUserCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPut("activate-company-user")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> ActivateCompanyUser([FromBody] ActivateCompanyUserCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPost("add-company-work-schedule")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> AddCompanyWorkSchedule([FromBody] AddCompanyWorkScheduleCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPut("edit-company-work-schedule")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> EditCompanyWorkSchedule([FromBody] EditCompanyWorkScheduleCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete("delete-company-work-schedule")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> DeleteCompanyWorkSchedule([FromBody] DeleteCompanyWorkScheduleCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPost("add-company-work-area")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> AddCompanyWorkArea([FromBody] AddCompanyWorkAreaCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPut("edit-company-work-area")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> EditCompanyWorkArea([FromBody] EditCompanyWorkAreaCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete("delete-company-work-area")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> DeleteCompanyWorkArea([FromBody] DeleteCompanyWorkAreaCommand command)
        {
            var result = await _mediator.Send(command); 
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPost("add-company-break-settings")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> AddCompanyBreakSettings([FromBody] AddCompanyBreakSettingsCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPut("edit-company-break-settings")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> EditCompanyBreakSettings([FromBody] EditCompanyBreakSettingsCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete("delete-company-break-settings")]
        [Authorize(Roles = "CompanyAdmin")]
        public async Task<IActionResult> DeleteCompanyBreakSettings([FromBody] DeleteCompanyBreakSettingsCommand command)
        {
            var result = await _mediator.Send(command);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }


}
