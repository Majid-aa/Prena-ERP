using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prena.Infrastructure.Persistence;
using Prena.Domain.Entities;
using Prena.Domain.Enums;

namespace Prena.Api.Controllers;

public class CompanyController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;

    public CompanyController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCompanies()
    {
        var companies = await _context.Companies
            .Select(c => new
            {
                c.Id,
                Name = c.CompanyName,
                c.Slug,
                Plan = c.PlanType.ToString(),
                Status = c.Status.ToString(),
                Users = c.Memberships.Count,
                CreatedAt = c.CreatedAt.ToString("yyyy/MM/dd")
            })
            .ToListAsync();

        return Ok(new { success = true, data = companies });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCompany(Guid id)
    {
        var company = await _context.Companies
            .Include(c => c.Memberships)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (company == null) return NotFound();

        return Ok(new
        {
            success = true,
            data = new
            {
                company.Id,
                Name = company.CompanyName,
                company.Slug,
                Plan = company.PlanType.ToString(),
                Status = company.Status.ToString(),
                Users = company.Memberships.Count,
                company.CreatedAt
            }
        });
    }

    [HttpPost]
    public async Task<IActionResult> CreateCompany([FromBody] CreateCompanyRequest request)
    {
        var slug = request.CompanyName.ToLower().Replace(" ", "-");
        var company = Company.Create(request.CompanyName, request.IndustryType, RegistrationSource.Agent, slug);

        _context.Companies.Add(company);
        await _context.SaveChangesAsync();

        return Created($"/api/v1/company/{company.Id}", new { success = true, message = "شرکت با موفقیت ایجاد شد.", data = new { company.Id, company.Slug } });
    }
}

public record CreateCompanyRequest(string CompanyName, string IndustryType);
