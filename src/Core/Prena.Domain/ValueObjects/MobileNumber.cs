using System.Collections.Generic;
using System.Linq;
using Prena.Domain.Common;
using Prena.Domain.Exceptions;

namespace Prena.Domain.ValueObjects;

public class MobileNumber : ValueObject
{
    public string Number { get; }

    private MobileNumber(string number)
    {
        Number = number;
    }

    public static MobileNumber Create(string number)
    {
        if (string.IsNullOrWhiteSpace(number))
            throw new DomainException("شماره موبایل نمی‌تواند خالی باشد.");

        var normalized = new string(number.Where(char.IsDigit).ToArray());

        if (normalized.Length < 10 || normalized.Length > 13)
            throw new DomainException("شماره موبایل نامعتبر است.");

        return new MobileNumber(normalized);
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Number;
    }

    public override string ToString() => Number;
}
