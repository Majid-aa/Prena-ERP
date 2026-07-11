using Microsoft.Extensions.Logging;
using Prena.Application.Common.Interfaces;

namespace Prena.Infrastructure.Services;

public class ConsoleSmsService : ISmsService
{
    private readonly ILogger<ConsoleSmsService> _logger;

    public ConsoleSmsService(ILogger<ConsoleSmsService> logger)
    {
        _logger = logger;
    }

    public Task SendAsync(string mobile, string message)
    {
        _logger.LogInformation("📱 SMS to {Mobile}: {Message}", mobile, message);
        return Task.CompletedTask;
    }
}
