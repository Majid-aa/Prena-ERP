// src/Application/Prena.Application/Features/Auth/Commands/RequestOtp/RequestOtpCommandHandler.cs
using MediatR;
using Microsoft.Extensions.Logging;
using Prena.Application.Common.Interfaces;
using Prena.Domain.Entities;
using Prena.Domain.ValueObjects;

namespace Prena.Application.Features.Auth.Commands.RequestOtp;

public class RequestOtpCommandHandler : IRequestHandler<RequestOtpCommand, RequestOtpResult>
{
    private readonly IApplicationDbContext _context;
    private readonly ISmsService _smsService;
    private readonly ICacheService _cache;
    private readonly ILogger<RequestOtpCommandHandler> _logger;

    public RequestOtpCommandHandler(
        IApplicationDbContext context,
        ISmsService smsService,
        ICacheService cache,
        ILogger<RequestOtpCommandHandler> logger)
    {
        _context = context;
        _smsService = smsService;
        _cache = cache;
        _logger = logger;
    }

    public async Task<RequestOtpResult> Handle(
        RequestOtpCommand request,
        CancellationToken cancellationToken)
    {
        // 1. Validate Mobile Number
        var mobileResult = MobileNumber.Create(request.Mobile);

        // 2. Rate Limiting Check
        var cacheKey = $"otp:attempts:{request.Mobile}";
        var attempts = await _cache.GetAsync<int>(cacheKey);

        if (attempts >= 3)
            return RequestOtpResult.Failure("تعداد درخواست‌ها بیش از حد مجاز. ۱۵ دقیقه صبر کنید.");

        // 3. Generate 6-digit OTP
        var code = Random.Shared.Next(100000, 999999).ToString();

        // 4. Store OTP in Cache (2 minutes expiry)
        var otpCacheKey = $"otp:code:{request.Mobile}";
        await _cache.SetAsync(otpCacheKey, code, TimeSpan.FromMinutes(2));

        // 5. Increment attempts
        await _cache.IncrementAsync(cacheKey, TimeSpan.FromMinutes(15));

        // 6. Send SMS (in production, via Kavenegar/Twilio)
        await _smsService.SendAsync(request.Mobile, $"کد تأیید Prena: {code}");

        _logger.LogInformation("OTP sent to {Mobile}", request.Mobile[..6] + "***");

        return RequestOtpResult.Success(120);
    }
}