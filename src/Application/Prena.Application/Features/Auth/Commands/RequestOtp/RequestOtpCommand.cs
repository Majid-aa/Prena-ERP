// src/Application/Prena.Application/Features/Auth/Commands/RequestOtp/RequestOtpCommand.cs
using MediatR;

namespace Prena.Application.Features.Auth.Commands.RequestOtp;

public record RequestOtpCommand(string Mobile) : IRequest<RequestOtpResult>;

public record RequestOtpResult
{
    public bool IsSuccess { get; init; }
    public string? Message { get; init; }
    public int? ExpiresInSeconds { get; init; }

    public static RequestOtpResult Success(int expiresIn) => new()
    {
        IsSuccess = true,
        ExpiresInSeconds = expiresIn
    };

    public static RequestOtpResult Failure(string message) => new()
    {
        IsSuccess = false,
        Message = message
    };
}