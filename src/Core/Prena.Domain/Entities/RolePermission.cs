using System;

namespace Prena.Domain.Entities;

public class RolePermission
{
    public Guid RoleId { get; private set; }
    public Guid PermissionId { get; private set; }
    public string? Restrictions { get; private set; } = "{}";

    public Role Role { get; private set; } = null!;
    public Permission Permission { get; private set; } = null!;

    private RolePermission() { }

    public static RolePermission Create(Guid roleId, Guid permissionId, string? restrictions = null)
    {
        return new RolePermission
        {
            RoleId = roleId,
            PermissionId = permissionId,
            Restrictions = restrictions ?? "{}"
        };
    }
}
