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
    }

    private static async Task SeedPermissionsAsync(ApplicationDbContext context)
    {
        if (await context.Permissions.AnyAsync())
            return;

        var companyMgmt = PermissionGroup.Create(Guid.NewGuid(), "company_management", "مدیریت شرکت‌ها", 1);
        var userMgmt = PermissionGroup.Create(Guid.NewGuid(), "user_management", "مدیریت کاربران", 2);
        var roleMgmt = PermissionGroup.Create(Guid.NewGuid(), "role_management", "مدیریت نقش‌ها", 3);
        var accounting = PermissionGroup.Create(Guid.NewGuid(), "accounting", "حسابداری", 4);
        var inventory = PermissionGroup.Create(Guid.NewGuid(), "inventory", "انبارداری", 5);
        var reports = PermissionGroup.Create(Guid.NewGuid(), "reports", "گزارشات", 6);

        context.PermissionGroups.AddRange(companyMgmt, userMgmt, roleMgmt, accounting, inventory, reports);

        var permissions = new List<Permission>
        {
            Permission.Create(Guid.NewGuid(), companyMgmt.Id, "company.create", "ایجاد شرکت جدید", "high"),
            Permission.Create(Guid.NewGuid(), companyMgmt.Id, "company.edit", "ویرایش اطلاعات شرکت", "high"),
            Permission.Create(Guid.NewGuid(), companyMgmt.Id, "company.view", "مشاهده شرکت‌ها", "normal"),
            Permission.Create(Guid.NewGuid(), companyMgmt.Id, "company.delete", "حذف شرکت", "critical"),
            
            Permission.Create(Guid.NewGuid(), userMgmt.Id, "user.create", "ایجاد کاربر", "normal"),
            Permission.Create(Guid.NewGuid(), userMgmt.Id, "user.edit", "ویرایش کاربر", "normal"),
            Permission.Create(Guid.NewGuid(), userMgmt.Id, "user.view", "مشاهده کاربران", "low"),
            
            Permission.Create(Guid.NewGuid(), roleMgmt.Id, "role.create", "ایجاد نقش جدید", "high"),
            Permission.Create(Guid.NewGuid(), roleMgmt.Id, "role.edit", "ویرایش نقش", "high"),
            Permission.Create(Guid.NewGuid(), roleMgmt.Id, "role.view", "مشاهده نقش‌ها", "low"),
            
            Permission.Create(Guid.NewGuid(), accounting.Id, "voucher.create", "ایجاد سند حسابداری", "high"),
            Permission.Create(Guid.NewGuid(), accounting.Id, "voucher.edit", "ویرایش سند", "high"),
            Permission.Create(Guid.NewGuid(), accounting.Id, "voucher.approve", "تأیید سند", "high"),
            Permission.Create(Guid.NewGuid(), accounting.Id, "voucher.reverse", "ابطال سند", "critical"),
            Permission.Create(Guid.NewGuid(), accounting.Id, "voucher.view", "مشاهده اسناد", "low"),
            
            Permission.Create(Guid.NewGuid(), inventory.Id, "inventory.receipt", "ثبت رسید انبار", "normal"),
            Permission.Create(Guid.NewGuid(), inventory.Id, "inventory.issue", "ثبت حواله انبار", "normal"),
            Permission.Create(Guid.NewGuid(), inventory.Id, "inventory.view", "مشاهده موجودی", "low"),
            
            Permission.Create(Guid.NewGuid(), reports.Id, "report.trial_balance", "گزارش تراز آزمایشی", "low"),
            Permission.Create(Guid.NewGuid(), reports.Id, "report.ledger", "گزارش دفتر کل", "low"),
            Permission.Create(Guid.NewGuid(), reports.Id, "report.profit_loss", "گزارش سود و زیان", "normal"),
            Permission.Create(Guid.NewGuid(), reports.Id, "report.balance_sheet", "گزارش ترازنامه", "normal"),
        };

        context.Permissions.AddRange(permissions);
        await context.SaveChangesAsync();
    }

    private static async Task SeedRolesAsync(ApplicationDbContext context)
    {
        if (await context.Roles.AnyAsync())
            return;

        var allPermissions = await context.Permissions.ToListAsync();

        var superAdmin = Role.Create(Guid.NewGuid(), "super_admin", "سوپر ادمین", "system", true, "دسترسی کامل");
        var companyAdmin = Role.Create(Guid.NewGuid(), "company_admin", "مدیر شرکت", "company", true, "مدیر ارشد");
        var accountant = Role.Create(Guid.NewGuid(), "accountant", "حسابدار", "company", true);
        var warehouse = Role.Create(Guid.NewGuid(), "warehouse_keeper", "انباردار", "company", true);
        var viewer = Role.Create(Guid.NewGuid(), "viewer", "مشاهده‌گر", "company", true);

        context.Roles.AddRange(superAdmin, companyAdmin, accountant, warehouse, viewer);
        await context.SaveChangesAsync();

        // Super Admin: all permissions
        foreach (var perm in allPermissions)
            context.RolePermissions.Add(RolePermission.Create(superAdmin.Id, perm.Id));

        // Company Admin: most permissions
        foreach (var perm in allPermissions.Where(p => !p.PermissionKey.StartsWith("role.")))
            context.RolePermissions.Add(RolePermission.Create(companyAdmin.Id, perm.Id));

        // Accountant: voucher + reports
        foreach (var perm in allPermissions.Where(p => p.PermissionKey.StartsWith("voucher.") || p.PermissionKey.StartsWith("report.")))
            context.RolePermissions.Add(RolePermission.Create(accountant.Id, perm.Id));

        // Warehouse: inventory
        foreach (var perm in allPermissions.Where(p => p.PermissionKey.StartsWith("inventory.")))
            context.RolePermissions.Add(RolePermission.Create(warehouse.Id, perm.Id));

        // Viewer: view only
        foreach (var perm in allPermissions.Where(p => p.PermissionKey.EndsWith(".view") || p.PermissionKey.StartsWith("report.")))
            context.RolePermissions.Add(RolePermission.Create(viewer.Id, perm.Id));

        await context.SaveChangesAsync();
    }

    private static async Task SeedSuperAdminAsync(ApplicationDbContext context)
    {
        if (await context.Users.AnyAsync(u => u.IsSuperAdmin))
            return;

        var superAdmin = User.Create(MobileNumber.Create("09120000000"), "مدیر سیستم");
        typeof(User).GetProperty("IsSuperAdmin")?.SetValue(superAdmin, true);

        context.Users.Add(superAdmin);
        await context.SaveChangesAsync();
    }

    private static async Task SeedAgentLevelsAsync(ApplicationDbContext context)
    {
        if (await context.AgentLevels.AnyAsync())
            return;

        context.AgentLevels.AddRange(
            AgentLevel.Create(Guid.NewGuid(), "junior", "پشتیبان عادی", 1, 50),
            AgentLevel.Create(Guid.NewGuid(), "senior", "پشتیبان ارشد", 2, 200, true, 50_000_000),
            AgentLevel.Create(Guid.NewGuid(), "team_lead", "سرپرست تیم", 3, null, true, 200_000_000)
        );

        await context.SaveChangesAsync();
    }
}
