using Microsoft.AspNetCore.Mvc;
using Prena.Application.Features.Auth.Commands.RequestOtp;
using Prena.Application.Features.Auth.Commands.VerifyOtp;
using Prena.Application.Features.Auth.Queries.GetCompanies;

namespace Prena.Api.Controllers;

public class AuthController : ApiControllerBase
{
    /// <summary>
    /// درخواست کد یکبار مصرف (OTP) برای ورود یا ثبت‌نام
    /// </summary>
    [HttpPost("request-otp")]
    [ProducesResponseType(typeof(RequestOtpResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    public async Task<IActionResult> RequestOtp([FromBody] RequestOtpCommand command)
    {
        var result = await Mediator.Send(command);
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }

    /// <summary>
    /// تأیید کد OTP و دریافت توکن
    /// </summary>
    [HttpPost("verify-otp")]
    [ProducesResponseType(typeof(VerifyOtpResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpCommand command)
    {
        var result = await Mediator.Send(command);
        return result.IsSuccess ? Ok(result) : Unauthorized(result);
    }

    /// <summary>
    /// دریافت لیست شرکت‌های کاربر
    /// </summary>
    [HttpGet("companies")]
    [ProducesResponseType(typeof(List<CompanyDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCompanies()
    {
        var result = await Mediator.Send(new GetCompaniesQuery());
        return Ok(result);
    }
}
