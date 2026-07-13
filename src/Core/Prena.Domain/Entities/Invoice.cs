using Prena.Domain.Common;

namespace Prena.Domain.Entities;

public class Invoice : BaseEntity
{
    public string InvoiceNumber { get; private set; } = "";
    public string Customer { get; private set; } = "";
    public DateTime InvoiceDate { get; private set; }
    public string Description { get; private set; } = "";
    public string Status { get; private set; } = "pending";
    public List<InvoiceLine> Lines { get; private set; } = new();

    private Invoice() { }

    public static Invoice Create(string number, string customer, DateTime date, string description)
    {
        return new Invoice
        {
            Id = Guid.CreateVersion7(),
            InvoiceNumber = number,
            Customer = customer,
            InvoiceDate = date,
            Description = description,
            Status = "pending",
            CreatedAt = DateTime.UtcNow
        };
    }

    public void AddLine(string productName, int quantity, decimal price)
    {
        Lines.Add(InvoiceLine.Create(Id, productName, quantity, price));
    }
}

public class InvoiceLine
{
    public Guid Id { get; private set; }
    public Guid InvoiceId { get; private set; }
    public string ProductName { get; private set; } = "";
    public int Quantity { get; private set; }
    public decimal Price { get; private set; }
    public Invoice Invoice { get; private set; } = null!;

    private InvoiceLine() { }

    public static InvoiceLine Create(Guid invoiceId, string productName, int quantity, decimal price)
    {
        return new InvoiceLine
        {
            Id = Guid.CreateVersion7(),
            InvoiceId = invoiceId,
            ProductName = productName,
            Quantity = quantity,
            Price = price
        };
    }
}