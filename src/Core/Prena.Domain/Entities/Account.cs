using Prena.Domain.Common;

namespace Prena.Domain.Entities;

public class Account : BaseEntity
{
    public string Code { get; private set; } = "";
    public string Name { get; private set; } = "";
    public string Nature { get; private set; } = ""; // asset, liability, equity, income, expense
    public bool IsActive { get; private set; } = true;
    public Guid? ParentId { get; private set; }
    public Account? Parent { get; private set; }
    public ICollection<Account> Children { get; private set; } = new List<Account>();

    private Account() { }

    public static Account Create(string code, string name, string nature, Guid? parentId = null)
    {
        return new Account { Id = Guid.CreateVersion7(), Code = code, Name = name, Nature = nature, ParentId = parentId, CreatedAt = DateTime.UtcNow };
    }
}