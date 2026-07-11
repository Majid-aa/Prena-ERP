using System;

namespace Prena.Domain.Common;

public interface IDomainEvent
{
    DateTime OccurredOn { get; }
}
