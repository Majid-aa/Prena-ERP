using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Prena.Application.Common.Interfaces;
using Prena.Infrastructure.Persistence;
using Prena.Infrastructure.Services;

namespace Prena.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Database
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetRequiredService<ApplicationDbContext>());

        // Services
        services.AddScoped<ISmsService, ConsoleSmsService>();
        services.AddScoped<ICacheService, MemoryCacheService>();
        services.AddScoped<ITokenService, TokenService>();
        
        services.AddMemoryCache();

        return services;
    }
}
