using Microsoft.AspNetCore.Authorization;

namespace Prena.Api.Authorization;

public class PermissionRequirement : IAuthorizationRequirement
{
    public string Permission { get; }

    public PermissionRequirement(string permission)
    {
        Permission = permission;
    }
}

public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        PermissionRequirement requirement)
    {
        var isSuperAdmin = context.User.FindFirst("is_super_admin")?.Value == "true";

        if (isSuperAdmin)
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

        // TODO: Check user permissions from database/cache
        // For now, only super admin passes

        return Task.CompletedTask;
    }
}
