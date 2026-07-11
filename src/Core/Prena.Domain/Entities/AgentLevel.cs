using System;

namespace Prena.Domain.Entities;

public class AgentLevel
{
    public Guid Id { get; private set; }
    public string LevelKey { get; private set; } = string.Empty;
    public string LevelNameFa { get; private set; } = string.Empty;
    public int LevelNumber { get; private set; }
    public string? AutoPermissions { get; private set; } = "[]";
    public int? MaxAssignedCustomers { get; private set; }
    public bool CanWaivePayment { get; private set; }
    public decimal MaxWaiveAmount { get; private set; }
    public bool CanCreateRoles { get; private set; }
    public bool IsActive { get; private set; } = true;

    private AgentLevel() { }

    public static AgentLevel Create(Guid id, string levelKey, string levelNameFa, int levelNumber, 
        int? maxAssignedCustomers = null, bool canWaivePayment = false, decimal maxWaiveAmount = 0)
    {
        return new AgentLevel
        {
            Id = id,
            LevelKey = levelKey,
            LevelNameFa = levelNameFa,
            LevelNumber = levelNumber,
            MaxAssignedCustomers = maxAssignedCustomers,
            CanWaivePayment = canWaivePayment,
            MaxWaiveAmount = maxWaiveAmount
        };
    }
}
