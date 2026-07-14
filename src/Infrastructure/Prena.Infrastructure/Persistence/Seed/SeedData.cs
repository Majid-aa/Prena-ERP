using Microsoft.EntityFrameworkCore;
using Prena.Domain.Entities;
using Prena.Domain.ValueObjects;

namespace Prena.Infrastructure.Persistence.Seed;

public static class SeedData
{
    public static async Task InitializeAsync(ApplicationDbContext context)
    {
        await context.Database.EnsureCreatedAsync();
        await SeedPermissionsAsync(context);
        await SeedRolesAsync(context);
        await SeedSuperAdminAsync(context);
        await SeedAgentLevelsAsync(context);
        await SeedAccountsAsync(context);
    }

    private static async Task SeedPermissionsAsync(ApplicationDbContext context)
    {
        if (await context.Permissions.AnyAsync()) return;
        var companyMgmt = PermissionGroup.Create(Guid.NewGuid(), "company_management", "Company Management", 1);
        var userMgmt = PermissionGroup.Create(Guid.NewGuid(), "user_management", "User Management", 2);
        context.PermissionGroups.AddRange(companyMgmt, userMgmt);
        context.Permissions.AddRange(
            Permission.Create(Guid.NewGuid(), companyMgmt.Id, "company.create", "Create Company", "high"),
            Permission.Create(Guid.NewGuid(), companyMgmt.Id, "company.view", "View Companies", "low"),
            Permission.Create(Guid.NewGuid(), userMgmt.Id, "user.create", "Create User", "normal"),
            Permission.Create(Guid.NewGuid(), userMgmt.Id, "user.view", "View Users", "low")
        );
        await context.SaveChangesAsync();
    }

    private static async Task SeedRolesAsync(ApplicationDbContext context)
    {
        if (await context.Roles.AnyAsync()) return;
        var allPermissions = await context.Permissions.ToListAsync();
        var superAdmin = Role.Create(Guid.NewGuid(), "super_admin", "Super Admin", "system", true, "Full access");
        var companyAdmin = Role.Create(Guid.NewGuid(), "company_admin", "Company Admin", "company", true);
        context.Roles.AddRange(superAdmin, companyAdmin);
        await context.SaveChangesAsync();
        foreach (var perm in allPermissions) context.RolePermissions.Add(RolePermission.Create(superAdmin.Id, perm.Id));
        foreach (var perm in allPermissions) context.RolePermissions.Add(RolePermission.Create(companyAdmin.Id, perm.Id));
        await context.SaveChangesAsync();
    }

    private static async Task SeedSuperAdminAsync(ApplicationDbContext context)
    {
        if (await context.Users.AnyAsync(u => u.IsSuperAdmin)) return;
        var superAdmin = User.Create(MobileNumber.Create("09120000000"), "Admin");
        typeof(User).GetProperty("IsSuperAdmin")?.SetValue(superAdmin, true);
        context.Users.Add(superAdmin);
        await context.SaveChangesAsync();
    }

    private static async Task SeedAgentLevelsAsync(ApplicationDbContext context)
    {
        if (await context.AgentLevels.AnyAsync()) return;
        context.AgentLevels.AddRange(
            AgentLevel.Create(Guid.NewGuid(), "junior", "Junior", 1, 50),
            AgentLevel.Create(Guid.NewGuid(), "senior", "Senior", 2, 200, true, 50000000)
        );
        await context.SaveChangesAsync();
    }

    private static async Task SeedAccountsAsync(ApplicationDbContext context)
    {
        if (await context.Accounts.AnyAsync()) return;
        context.Accounts.AddRange(
            Account.Create("1101", "Cash", "asset"),
            Account.Create("1102", "Bank", "asset"),
            Account.Create("1201", "Receivables", "asset"),
            Account.Create("2101", "Payables", "liability"),
            Account.Create("3101", "Capital", "equity"),
            Account.Create("4101", "Sales", "income"),
            Account.Create("5101", "Purchases", "expense"),
            Account.Create("5102", "Rent", "expense"),
            Account.Create("5103", "Salary", "expense")
        );
        await context.SaveChangesAsync();
    }
}