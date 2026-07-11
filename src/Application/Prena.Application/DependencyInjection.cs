// src/Application/Prena.Application/DependencyInjection.cs
using System.Reflection;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Prena.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
        });

        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        return services;
    }
}