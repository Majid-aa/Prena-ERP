// src/Application/Prena.Application/Features/Auth/Commands/RequestOtp/RequestOtpCommandValidator.cs
using FluentValidation;

namespace Prena.Application.Features.Auth.Commands.RequestOtp;

public class RequestOtpCommandValidator : AbstractValidator<RequestOtpCommand>
{
    public RequestOtpCommandValidator()
    {
        RuleFor(x => x.Mobile)
            .NotEmpty()
            .WithMessage("شماره موبایل الزامی است.")
            .Matches(@"^09\d{9}$")
            .WithMessage("شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.");
    }
}