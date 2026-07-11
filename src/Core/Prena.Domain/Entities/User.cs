using System;
using System.Collections.Generic;
using Prena.Domain.Common;
using Prena.Domain.DomainEvents;
using Prena.Domain.ValueObjects;

namespace Prena.Domain.Entities;

public class User : BaseEntity, IAggregateRoot
{
    public MobileNumber Mobile { get; private set; } = null!;
    public string? FullName { get; private set; }
    public string? PasswordHash { get; private set; }
    public bool IsSuperAdmin { get; private set; }
    public bool IsActive { get; private set; } = true;
    public DateTime? LastLoginAt { get; private set; }

    private readonly List<CompanyMembership> _memberships = new();
    public IReadOnlyCollection<CompanyMembership> Memberships => _memberships.AsReadOnly();

    private User() { }

    public static User Create(MobileNumber mobile, string? fullName = null)
    {
        var user = new User
        {
            Id = Guid.CreateVersion7(),
            Mobile = mobile,
            FullName = fullName,
            IsSuperAdmin = false,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        user.AddDomainEvent(new UserRegisteredDomainEvent(user.Id, mobile.Number));

        return user;
    }

    public void SetPassword(string passwordHash)
    {
        PasswordHash = passwordHash;
        UpdatedAt = DateTime.UtcNow;
    }

    public void RecordLogin()
    {
        LastLoginAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Deactivate()
    {
        IsActive = false;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Activate()
    {
        IsActive = true;
        UpdatedAt = DateTime.UtcNow;
    }
}
