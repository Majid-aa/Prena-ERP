using MediatR;

namespace Prena.Application.Features.Auth.Commands.VerifyOtp;

public record VerifyOtpCommand(string Mobile, string Code) : IRequest<VerifyOtpResult>;

public record VerifyOtpResult
{
    public bool IsSuccess { get; init; }
    public string? Message { get; init; }
    public string? AccessToken { get; init; }
    public string? RefreshToken { get; init; }
    public string? TokenType { get; init; }
    public int? ExpiresIn { get; init; }
    public UserInfoDto? User { get; init; }
    public List<CompanyDto> Companies { get; init; } = new();

    public static VerifyOtpResult Success(string accessToken, string refreshToken, UserInfoDto user, List<CompanyDto> companies)
        => new()
        {
            IsSuccess = true,
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            TokenType = "bearer",
            ExpiresIn = 86400,
            User = user,
            Companies = companies
        };

    public static VerifyOtpResult Failure(string message)
        => new() { IsSuccess = false, Message = message };
}

public record UserInfoDto(Guid Id, string FullName, string Mobile);

public record CompanyDto(Guid Id, string Name, string Slug, string Role);
