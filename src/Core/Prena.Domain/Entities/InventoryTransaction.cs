using Prena.Domain.Common;

namespace Prena.Domain.Entities;

public class InventoryTransaction : BaseEntity
{
    public string TransactionNumber { get; private set; } = string.Empty;
    public string TransactionType { get; private set; } = string.Empty; // "receipt" or "issue"
    public DateTime TransactionDate { get; private set; }
    public string Description { get; private set; } = string.Empty;
    public string Supplier { get; private set; } = string.Empty;
    public string Department { get; private set; } = string.Empty;
    public List<InventoryTransactionLine> Lines { get; private set; } = new();

    private InventoryTransaction() { }

    public static InventoryTransaction Create(string number, string type, DateTime date, string description, string supplier = "", string department = "")
    {
        return new InventoryTransaction
        {
            Id = Guid.CreateVersion7(),
            TransactionNumber = number,
            TransactionType = type,
            TransactionDate = date,
            Description = description,
            Supplier = supplier,
            Department = department,
            CreatedAt = DateTime.UtcNow
        };
    }

    public void AddLine(Guid productId, decimal quantity, decimal price = 0)
    {
        Lines.Add(InventoryTransactionLine.Create(Id, productId, quantity, price));
    }
}

public class InventoryTransactionLine
{
    public Guid Id { get; private set; }
    public Guid TransactionId { get; private set; }
    public Guid ProductId { get; private set; }
    public decimal Quantity { get; private set; }
    public decimal Price { get; private set; }
    public InventoryTransaction Transaction { get; private set; } = null!;

    private InventoryTransactionLine() { }

    public static InventoryTransactionLine Create(Guid transactionId, Guid productId, decimal quantity, decimal price)
    {
        return new InventoryTransactionLine
        {
            Id = Guid.CreateVersion7(),
            TransactionId = transactionId,
            ProductId = productId,
            Quantity = quantity,
            Price = price
        };
    }
}