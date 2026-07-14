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
        var g1 = PermissionGroup.Create(Guid.NewGuid(), "company_mgmt", "مدیریت شرکت", 1);
        var g2 = PermissionGroup.Create(Guid.NewGuid(), "user_mgmt", "مدیریت کاربران", 2);
        var g3 = PermissionGroup.Create(Guid.NewGuid(), "accounting", "حسابداری", 3);
        context.PermissionGroups.AddRange(g1, g2, g3);
        context.Permissions.AddRange(
            Permission.Create(Guid.NewGuid(), g1.Id, "company.create", "ایجاد شرکت", "high"),
            Permission.Create(Guid.NewGuid(), g2.Id, "user.create", "ایجاد کاربر", "normal"),
            Permission.Create(Guid.NewGuid(), g3.Id, "voucher.create", "ایجاد سند", "high")
        );
        await context.SaveChangesAsync();
    }

    private static async Task SeedRolesAsync(ApplicationDbContext context)
    {
        if (await context.Roles.AnyAsync()) return;
        var r1 = Role.Create(Guid.NewGuid(), "super_admin", "سوپر ادمین", "system", true, "دسترسی کامل");
        var r2 = Role.Create(Guid.NewGuid(), "company_admin", "مدیر شرکت", "company", true);
        context.Roles.AddRange(r1, r2);
        await context.SaveChangesAsync();
    }

    private static async Task SeedSuperAdminAsync(ApplicationDbContext context)
    {
        if (await context.Users.AnyAsync(u => u.IsSuperAdmin)) return;
        var u = User.Create(MobileNumber.Create("09120000000"), "مدیر سیستم");
        typeof(User).GetProperty("IsSuperAdmin")?.SetValue(u, true);
        context.Users.Add(u); await context.SaveChangesAsync();
    }

    private static async Task SeedAgentLevelsAsync(ApplicationDbContext context)
    {
        if (await context.AgentLevels.AnyAsync()) return;
        context.AgentLevels.AddRange(
            AgentLevel.Create(Guid.NewGuid(), "junior", "پشتیبان عادی", 1, 50),
            AgentLevel.Create(Guid.NewGuid(), "senior", "پشتیبان ارشد", 2, 200, true, 50000000)
        );
        await context.SaveChangesAsync();
    }

    private static async Task SeedAccountsAsync(ApplicationDbContext context)
    {
        if (await context.Accounts.AnyAsync()) return;
        context.Accounts.AddRange(
            Account.Create("1101", "صندوق", "asset"),
            Account.Create("1102", "بانک تجارت", "asset"),
            Account.Create("1201", "حساب های دریافتنی", "asset"),
            Account.Create("1301", "موجودی کالا", "asset"),
            Account.Create("2101", "حساب های پرداختنی", "liability"),
            Account.Create("2102", "مالیات پرداختنی", "liability"),
            Account.Create("3101", "سرمایه", "equity"),
            Account.Create("3102", "سود انباشته", "equity"),
            Account.Create("4101", "فروش کالا", "income"),
            Account.Create("4102", "درآمد خدمات", "income"),
            Account.Create("5101", "خرید کالا", "expense"),
            Account.Create("5102", "هزینه اجاره", "expense"),
            Account.Create("5103", "هزینه حقوق", "expense")
        );
        await context.SaveChangesAsync();
    }
}