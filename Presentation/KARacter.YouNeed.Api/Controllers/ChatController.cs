using KARacter.YouNeed.Application.Features.Chat.Commands.MarkMessageAsRead;
using KARacter.YouNeed.Application.Features.Chat.Commands.SendMessage;
using KARacter.YouNeed.Application.Features.Chat.Commands.StartChat;
using KARacter.YouNeed.Application.Features.Chat.Queries.GetMessagesInThread;
using KARacter.YouNeed.Application.Features.Chat.Queries.GetThreads;
using KARacter.YouNeed.Infrastructure.Hubs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace KARacter.YouNeed.Api.Controllers;

[Route("api/v1.0/chat")]
[ApiController]
public class ChatController : ControllerBase
{
    private readonly IMediator _mediator;
    private IHubContext<ChatHub> _hubContext; 

    public ChatController(IMediator mediator, IHubContext<ChatHub> hubContext)
    {
        _mediator = mediator;
        _hubContext = hubContext;
    }

    [HttpGet("threads")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetThreads()
    {
        var query = new GetThreadsQuery();
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
        {
            return Ok(result);
        }
        return BadRequest(result.Message);
    }

    [HttpGet("messages-in-thread/{threadId}")]
    public async Task<IActionResult> GetMessagesInThread([FromRoute] Guid threadId)
    {
        var query = new GetMessagesInThreadQuery { ThreadId = threadId };
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
        {
            await _hubContext.Clients.Group(threadId.ToString()).SendAsync("ReceiveMessageHistory", result.Messages);
            return Ok(result);
        }

        await _hubContext.Clients.Group(threadId.ToString()).SendAsync("Error", result.Message);
        return BadRequest(result.Message);
    }

    [HttpPost("start-chat")]
    public async Task<IActionResult> StartChat([FromBody] StartChatCommand command)
    {
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
        {
            await _hubContext.Clients.Group(result.ThreadId.ToString()).SendAsync("StartChat", result.ThreadId);
            return Ok(result);
        }

        await _hubContext.Clients.Group(result.ThreadId.ToString()).SendAsync("Error", result.Message);
        return BadRequest(result.Message);
    }

    [HttpPost("send-message")]
    public async Task<IActionResult> SendMessage([FromBody] SendMessageCommand command)
    {
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
        {
            await _hubContext.Clients.Group(command.ThreadId.ToString()).SendAsync("ReceiveMessage", result.Message);
            return Ok(result);
        }

        await _hubContext.Clients.Group(command.ThreadId.ToString()).SendAsync("Error", result.Message);
        return BadRequest(result.Message);
    }

    [HttpPost("mark-message-as-read")]
    public async Task<IActionResult> MarkMessageAsRead([FromBody] MarkMessageAsReadCommand command)
    {
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
        {
            await _hubContext.Clients.Group(command.MessageId.ToString()).SendAsync("MessageRead", command.MessageId);
            return Ok(result);
        }

        await _hubContext.Clients.Group(command.MessageId.ToString()).SendAsync("Error", result.Message);
        return BadRequest(result.Message);
    }
    
}