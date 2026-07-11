using System.Net;
using System.Text.Json;
using Prena.Domain.Exceptions;

namespace Prena.Api.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var (statusCode, message) = exception switch
        {
            DomainException => (HttpStatusCode.BadRequest, exception.Message),
            UnauthorizedAccessException => (HttpStatusCode.Unauthorized, "دسترسی غیرمجاز"),
            KeyNotFoundException => (HttpStatusCode.NotFound, "مورد یافت نشد"),
            _ => (HttpStatusCode.InternalServerError, "خطای داخلی سرور. لطفا با پشتیبانی تماس بگیرید.")
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var result = JsonSerializer.Serialize(new
        {
            error = true,
            message,
            traceId = Guid.NewGuid().ToString(),
            timestamp = DateTime.UtcNow
        });

        await context.Response.WriteAsync(result);
    }
}
