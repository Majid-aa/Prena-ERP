using MediatR;
using Microsoft.Extensions.Logging;
using Prena.Application.Common.Interfaces;
using Prena.Domain.Entities;
using Prena.Domain.ValueObjects;

namespace Prena.Application.Features.Auth.Commands.VerifyOtp;

public class VerifyOtpCommandHandler : IRequestHandler<VerifyOtpCommand, VerifyOtpResult>
{
    private readonly IApplicationDbContext _context;
    private readonly ICacheService _cache;
    private readonly ITokenService _tokenService;
    private readonly ILogger<VerifyOtpCommandHandler> _logger;

    public VerifyOtpCommandHandler(
        IApplicationDbContext context,
        ICacheService cache,
        ITokenService tokenService,
        ILogger<VerifyOtpCommandHandler> logger)
    {
        _context = context;
        _cache = cache;
        _tokenService = tokenService;
        _logger = logger;
    }

    public async Task<VerifyOtpResult> Handle(VerifyOtpCommand request, CancellationToken cancellationToken)
    {
        // 1. Validate OTP from Cache
        var cacheKey = $"otp:code:{request.Mobile}";
        var storedCode = await _cache.GetAsync<string>(cacheKey);

        if (string.IsNullOrEmpty(storedCode) || storedCode != request.Code)
            return VerifyOtpResult.Failure("کد وارد شده صحیح نیست یا منقضی شده است.");

        // 2. Delete OTP from cache (one-time use)
        await _cache.RemoveAsync(cacheKey);

        // 3. Find or Create User
        var user = _context.Users
            .FirstOrDefault(u => u.Mobile.Number == request.Mobile);

        if (user == null)
        {
            var mobileNumber = MobileNumber.Create(request.Mobile);
            user = User.Create(mobileNumber, null);
            _context.Add(user);
            await _context.SaveChangesAsync(cancellationToken);
            
            _logger.LogInformation("New user registered: {Mobile}", request.Mobile[..6] + "***");
        }

        // 4. Record Login
        user.RecordLogin();
        await _context.SaveChangesAsync(cancellationToken);

        // 5. Get Companies
        var companies = _context.CompanyUsers
            .Where(cu => cu.UserId == user.Id && cu.IsActive)
            .Select(cu => new CompanyDto(
                cu.CompanyId,
                cu.Company.CompanyName,
                cu.Company.Slug,
                cu.RoleKey
            ))
            .ToList();

        // 6. Generate Tokens
        var userInfo = new UserInfoDto(user.Id, user.FullName ?? "", user.Mobile.Number);
        var accessToken = _tokenService.GenerateAccessToken(user, companies);
        var refreshToken = _tokenService.GenerateRefreshToken(user);

        _logger.LogInformation("User logged in: {UserId}", user.Id);

        return VerifyOtpResult.Success(accessToken, refreshToken, userInfo, companies);
    }
}
