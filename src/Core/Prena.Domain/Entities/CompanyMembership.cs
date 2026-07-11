using System;

namespace Prena.Domain.Entities;

public class CompanyMembership
{
    public Guid CompanyId { get; private set; }
    public Guid UserId { get; private set; }
    public string RoleKey { get; private set; } = string.Empty;
    public bool IsAdmin { get; private set; }
    public bool IsActive { get; private set; } = true;
    public DateTime JoinedAt { get; private set; }

    public Company Company { get; private set; } = null!;
    public User User { get; private set; } = null!;

    private CompanyMembership() { }

    public static CompanyMembership Create(Guid companyId, Guid userId, string roleKey)
    {
        return new CompanyMembership
        {
            CompanyId = companyId,
            UserId = userId,
            RoleKey = roleKey,
            IsAdmin = false,
            IsActive = true,
            JoinedAt = DateTime.UtcNow
        };
    }
}
