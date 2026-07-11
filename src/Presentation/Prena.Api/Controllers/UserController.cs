using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prena.Infrastructure.Persistence;
using Prena.Domain.Entities;
using Prena.Domain.ValueObjects;

namespace Prena.Api.Controllers;

public class UserController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users
            .Select(u => new
            {
                u.Id,
                FullName = u.FullName ?? "",
                Mobile = u.Mobile.Number,
                Status = u.IsActive ? "active" : "inactive",
                LastLogin = u.LastLoginAt.HasValue ? u.LastLoginAt.Value.ToString("yyyy/MM/dd") : "--",
                Role = "viewer"
            })
            .ToListAsync();

        return Ok(new { success = true, data = users });
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
    {
        var mobileNumber = MobileNumber.Create(request.Mobile);
        var user = Prena.Domain.Entities.User.Create(mobileNumber, request.FullName);

        if (!string.IsNullOrEmpty(request.Password))
        {
            user.SetPassword(BCrypt.Net.BCrypt.HashPassword(request.Password));
        }

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "کاربر با موفقیت ایجاد شد." });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserRequest request)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        if (!string.IsNullOrEmpty(request.FullName))
        {
            typeof(Prena.Domain.Entities.User).GetProperty("FullName")?.SetValue(user, request.FullName);
        }

        if (!string.IsNullOrEmpty(request.Password))
        {
            user.SetPassword(BCrypt.Net.BCrypt.HashPassword(request.Password));
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true, message = "کاربر بروزرسانی شد." });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        user.Deactivate();
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "کاربر غیرفعال شد." });
    }
}

public record CreateUserRequest(string Mobile, string FullName, string Password, string Role);
public record UpdateUserRequest(string? FullName, string? Password, string? Role);
