// src/Presentation/Prena.Api/Controllers/ApiControllerBase.cs
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Prena.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public abstract class ApiControllerBase : ControllerBase
{
    private ISender? _mediator;

    protected ISender Mediator =>
        _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();

    protected IActionResult Success<T>(T data)
        => Ok(new { success = true, data });

    protected IActionResult Error(string message)
        => BadRequest(new { success = false, message });
}