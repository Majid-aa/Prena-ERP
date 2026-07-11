using Prena.Application.Features.Auth.Commands.VerifyOtp;
using Prena.Domain.Entities;

namespace Prena.Application.Common.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user, List<CompanyDto> companies);
    string GenerateRefreshToken(User user);
}
