using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prena.Infrastructure.Persistence;

namespace Prena.Api.Controllers;

public class AccountController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;
    public AccountController(ApplicationDbContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> GetAccounts()
    {
        var accounts = await _context.Accounts
            .Where(a => a.IsActive)
            .OrderBy(a => a.Code)
            .Select(a => new { a.Id, a.Code, a.Name, a.Nature })
            .ToListAsync();
        return Ok(new { success = true, data = accounts });
    }
}