using Prena.Application;
using Prena.Infrastructure;
using Prena.Api.Middleware;
using Prena.Infrastructure.Persistence;
using Prena.Infrastructure.Persistence.Seed;
using Prena.Application.Common.Behaviours;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

// JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true, ValidateAudience = true, ValidateLifetime = true, ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"], ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await db.Database.MigrateAsync();
    await SeedData.InitializeAsync(db);
}

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseMiddleware<PerformanceMiddleware>();
app.UseCors("AllowReactApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// API Info
app.MapGet("/", () => "🚀 Prena ERP API is running!");
app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow, version = "1.0.0" }));
app.MapGet("/api", () => Results.Ok(new
{
    name = "Prena ERP API",
    version = "1.0.0",
    endpoints = new[] {
        "POST /api/v1/auth/request-otp",
        "POST /api/v1/auth/verify-otp",
        "GET  /api/v1/user",
        "POST /api/v1/user",
        "PUT  /api/v1/user/{id}",
        "DELETE /api/v1/user/{id}",
        "GET  /api/v1/role",
        "POST /api/v1/role",
        "GET  /api/v1/company",
        "POST /api/v1/company",
        "GET  /api/v1/module",
        "GET  /api/v1/agent",
        "GET  /health",
        "GET  /api"
    }
}));

app.Run();

public partial class Program { }
