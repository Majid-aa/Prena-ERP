using Prena.Domain.Common;

namespace Prena.Domain.Entities;

public class Voucher : BaseEntity
{
    public string VoucherNumber { get; private set; } = string.Empty;
    public DateTime VoucherDate { get; private set; }
    public string Description { get; private set; } = string.Empty;
    public string Status { get; private set; } = "draft";
    public List<VoucherLine> Lines { get; private set; } = new();

    private Voucher() { }

    public static Voucher Create(string voucherNumber, DateTime voucherDate, string description)
    {
        return new Voucher
        {
            Id = Guid.CreateVersion7(),
            VoucherNumber = voucherNumber,
            VoucherDate = voucherDate,
            Description = description,
            Status = "permanent",
            CreatedAt = DateTime.UtcNow
        };
    }

    public void AddLine(Guid accountId, decimal debit, decimal credit, string description)
    {
        Lines.Add(VoucherLine.Create(Id, accountId, debit, credit, description));
    }
}

public class VoucherLine
{
    public Guid Id { get; private set; }
    public Guid VoucherId { get; private set; }
    public Guid AccountId { get; private set; }
    public decimal Debit { get; private set; }
    public decimal Credit { get; private set; }
    public string Description { get; private set; } = string.Empty;
    public Voucher Voucher { get; private set; } = null!;

    private VoucherLine() { }

    public static VoucherLine Create(Guid voucherId, Guid accountId, decimal debit, decimal credit, string description)
    {
        return new VoucherLine
        {
            Id = Guid.CreateVersion7(),
            VoucherId = voucherId,
            AccountId = accountId,
            Debit = debit,
            Credit = credit,
            Description = description
        };
    }
}
