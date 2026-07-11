using System.Collections.Generic;
using Prena.Domain.Common;

namespace Prena.Domain.Entities;

public class Permission : BaseEntity
{
    public Guid GroupId { get; private set; }
    public string PermissionKey { get; private set; } = string.Empty;
    public string PermissionNameFa { get; private set; } = string.Empty;
    public string RiskLevel { get; private set; } = "normal";
    public bool IsActive { get; private set; } = true;

    public PermissionGroup Group { get; private set; } = null!;
    public ICollection<RolePermission> RolePermissions { get; private set; } = new List<RolePermission>();

    private Permission() { }

    public static Permission Create(Guid id, Guid groupId, string permissionKey, string permissionNameFa, string riskLevel = "normal")
    {
        return new Permission
        {
            Id = id,
            GroupId = groupId,
            PermissionKey = permissionKey,
            PermissionNameFa = permissionNameFa,
            RiskLevel = riskLevel
        };
    }
}
