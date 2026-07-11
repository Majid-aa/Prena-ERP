using System;
using System.Collections.Generic;
using Prena.Domain.Common;

namespace Prena.Domain.Entities;

public class Role : BaseEntity
{
    public string RoleKey { get; private set; } = string.Empty;
    public string RoleNameFa { get; private set; } = string.Empty;
    public string RoleScope { get; private set; } = "company";
    public Guid? ParentRoleId { get; private set; }
    public bool InheritsPermissions { get; private set; } = true;
    public bool IsSystemRole { get; private set; }
    public bool IsActive { get; private set; } = true;
    public string? Description { get; private set; }

    public Role? ParentRole { get; private set; }
    public ICollection<Role> ChildRoles { get; private set; } = new List<Role>();
    public ICollection<RolePermission> RolePermissions { get; private set; } = new List<RolePermission>();

    private Role() { }

    public static Role Create(Guid id, string roleKey, string roleNameFa, string roleScope = "company", bool isSystemRole = false, string? description = null)
    {
        return new Role
        {
            Id = id,
            RoleKey = roleKey,
            RoleNameFa = roleNameFa,
            RoleScope = roleScope,
            IsSystemRole = isSystemRole,
            Description = description
        };
    }
}
