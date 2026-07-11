using System;
using System.Collections.Generic;
using Prena.Domain.Common;
using Prena.Domain.Enums;

namespace Prena.Domain.Entities;

public class Company : BaseEntity, IAggregateRoot
{
    public Guid TenantId { get; private set; }
    public string CompanyName { get; private set; } = string.Empty;
    public string Slug { get; private set; } = string.Empty;
    public string IndustryType { get; private set; } = string.Empty;
    public PlanType PlanType { get; private set; }
    public CompanyStatus Status { get; private set; }
    public TenantType TenantType { get; private set; }
    public RegistrationSource RegistrationSource { get; private set; }

    private readonly List<CompanyMembership> _memberships = new();
    public IReadOnlyCollection<CompanyMembership> Memberships => _memberships.AsReadOnly();

    private Company() { }

    public static Company Create(
        string companyName,
        string industryType,
        RegistrationSource registrationSource,
        string slug)
    {
        return new Company
        {
            Id = Guid.CreateVersion7(),
            TenantId = Guid.CreateVersion7(),
            CompanyName = companyName,
            Slug = slug,
            IndustryType = industryType,
            PlanType = PlanType.Free,
            Status = CompanyStatus.Active,
            TenantType = TenantType.Real,
            RegistrationSource = registrationSource,
            CreatedAt = DateTime.UtcNow
        };
    }

    public void AddMember(Guid userId, string roleKey)
    {
        var membership = CompanyMembership.Create(Id, userId, roleKey);
        _memberships.Add(membership);
        UpdatedAt = DateTime.UtcNow;
    }
}
