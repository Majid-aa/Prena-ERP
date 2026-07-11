using MediatR;
using Prena.Application.Features.Auth.Commands.VerifyOtp;

namespace Prena.Application.Features.Auth.Queries.GetCompanies;

public record GetCompaniesQuery : IRequest<List<CompanyDto>>;
