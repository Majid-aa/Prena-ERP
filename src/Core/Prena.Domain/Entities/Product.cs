using Prena.Domain.Common;

namespace Prena.Domain.Entities;

public class Product : BaseEntity
{
    public string Name { get; private set; } = string.Empty;
    public string Code { get; private set; } = string.Empty;
    public string Unit { get; private set; } = string.Empty;
    public decimal Price { get; private set; }
    public decimal Quantity { get; private set; }
    public bool IsActive { get; private set; } = true;

    private Product() { }

    public static Product Create(string name, string code, string unit, decimal price)
    {
        return new Product
        {
            Id = Guid.CreateVersion7(),
            Name = name,
            Code = code,
            Unit = unit,
            Price = price,
            Quantity = 0,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };
    }

    public void AddStock(decimal quantity) => Quantity += quantity;
    public void RemoveStock(decimal quantity) => Quantity -= quantity;
}