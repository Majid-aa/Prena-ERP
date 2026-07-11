using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prena.Infrastructure.Persistence;

namespace Prena.Api.Controllers;

public class RoleController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;

    public RoleController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetRoles()
    {
        var roles = await _context.Roles
            .Include(r => r.RolePermissions)
            .Select(r => new
            {
                Key = r.RoleKey,
                Name = r.RoleNameFa,
                Scope = r.RoleScope == "system" ? "سیستمی" : "شرکتی",
                Users = _context.CompanyUsers.Count(cu => cu.RoleKey == r.RoleKey),
                Permissions = r.RolePermissions.Count + " دسترسی",
                System = r.IsSystemRole
            })
            .ToListAsync();

        return Ok(new { success = true, data = roles });
    }

    [HttpPost]
    public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
    {
        var role = Domain.Entities.Role.Create(
            Guid.NewGuid(),
            request.RoleKey,
            request.RoleName,
            request.RoleScope ?? "company",
            false,
            request.Description
        );

        _context.Roles.Add(role);
        await _context.SaveChangesAsync();

        return Created($"/api/v1/role/{role.Id}", new { success = true, message = "نقش با موفقیت ایجاد شد." });
    }
}

public record CreateRoleRequest(string RoleKey, string RoleName, string? RoleScope, string? Description);
