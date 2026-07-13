using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prena.Infrastructure.Persistence;
using Prena.Domain.Entities;

namespace Prena.Api.Controllers;

public class InventoryController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;

    public InventoryController(ApplicationDbContext context) => _context = context;

    [HttpGet("transactions")]
    public async Task<IActionResult> GetTransactions()
    {
        var list = await _context.InventoryTransactions
            .Include(t => t.Lines)
            .OrderByDescending(t => t.CreatedAt)
            .Take(50)
            .Select(t => new {
                t.Id, t.TransactionNumber, t.TransactionType, t.TransactionDate,
                t.Description, t.Supplier, t.Department,
                ItemCount = t.Lines.Count, TotalQuantity = t.Lines.Sum(l => l.Quantity)
            })
            .ToListAsync();
        return Ok(new { success = true, data = list });
    }

    [HttpPost("receipt")]
    public async Task<IActionResult> CreateReceipt([FromBody] CreateInventoryRequest request)
    {
        var number = "REC-" + DateTime.Now.ToString("yyyyMMdd") + "-" + new Random().Next(100, 999);
        var txn = InventoryTransaction.Create(number, "receipt", request.Date, request.Description, request.Supplier ?? "");
        foreach (var l in request.Lines)
        {
            txn.AddLine(l.ProductId, l.Quantity, l.Price);
            var p = await _context.Products.FindAsync(l.ProductId);
            if (p != null) p.AddStock(l.Quantity);
        }
        _context.InventoryTransactions.Add(txn);
        await _context.SaveChangesAsync();
        return Ok(new { success = true, message = "ok", data = new { txn.Id, txn.TransactionNumber } });
    }

    [HttpPost("issue")]
    public async Task<IActionResult> CreateIssue([FromBody] CreateInventoryRequest request)
    {
        var number = "ISS-" + DateTime.Now.ToString("yyyyMMdd") + "-" + new Random().Next(100, 999);
        var txn = InventoryTransaction.Create(number, "issue", request.Date, request.Description, department: request.Department ?? "");
        foreach (var l in request.Lines)
        {
            var p = await _context.Products.FindAsync(l.ProductId);
            if (p == null || p.Quantity < l.Quantity)
                return BadRequest(new { success = false, message = "no stock" });
            txn.AddLine(l.ProductId, l.Quantity, p.Price);
            p.RemoveStock(l.Quantity);
        }
        _context.InventoryTransactions.Add(txn);
        await _context.SaveChangesAsync();
        return Ok(new { success = true, message = "ok", data = new { txn.Id, txn.TransactionNumber } });
    }
}

public record CreateInventoryRequest(DateTime Date, string Description, string? Supplier, string? Department, List<InventoryLineRequest> Lines);
public record InventoryLineRequest(Guid ProductId, decimal Quantity, decimal Price);