using System.Collections.Generic;
using Prena.Domain.Common;

namespace Prena.Domain.Entities;

public class PermissionGroup : BaseEntity
{
    public string GroupKey { get; private set; } = string.Empty;
    public string GroupNameFa { get; private set; } = string.Empty;
    public Guid? ParentGroupId { get; private set; }
    public int SortOrder { get; private set; }
    public bool IsActive { get; private set; } = true;

    public PermissionGroup? ParentGroup { get; private set; }
    public ICollection<PermissionGroup> ChildGroups { get; private set; } = new List<PermissionGroup>();
    public ICollection<Permission> Permissions { get; private set; } = new List<Permission>();

    private PermissionGroup() { }

    public static PermissionGroup Create(Guid id, string groupKey, string groupNameFa, int sortOrder = 0)
    {
        return new PermissionGroup
        {
            Id = id,
            GroupKey = groupKey,
            GroupNameFa = groupNameFa,
            SortOrder = sortOrder
        };
    }
}
