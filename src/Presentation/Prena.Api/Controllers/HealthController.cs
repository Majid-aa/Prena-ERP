using Microsoft.AspNetCore.Mvc;

namespace Prena.Api.Controllers;

public class HealthController : ApiControllerBase
{
    [HttpGet("/health")]
    public IActionResult Health()
    {
        return Ok(new
        {
            status = "healthy",
            timestamp = DateTime.UtcNow,
            version = "1.0.0",
            services = new
            {
                api = "running",
                database = "connected"
            }
        });
    }

    [HttpGet("/info")]
    public IActionResult Info()
    {
        return Ok(new
        {
            name = "Prena ERP API",
            version = "1.0.0",
            environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production",
            dotnet = Environment.Version.ToString(),
            timestamp = DateTime.UtcNow
        });
    }
}
