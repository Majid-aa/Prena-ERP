using System;
using Prena.Domain.Common;

namespace Prena.Domain.DomainEvents;

public class UserRegisteredDomainEvent : IDomainEvent
{
    public Guid UserId { get; }
    public string Mobile { get; }
    public DateTime OccurredOn { get; }

    public UserRegisteredDomainEvent(Guid userId, string mobile)
    {
        UserId = userId;
        Mobile = mobile;
        OccurredOn = DateTime.UtcNow;
    }
}
