using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prena.Infrastructure.Persistence;
using Prena.Domain.Entities;

namespace Prena.Api.Controllers;

public class SalesController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;

    public SalesController(ApplicationDbContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> GetInvoices()
    {
        var invoices = await _context.Invoices
            .OrderByDescending(i => i.CreatedAt)
            .Take(50)
            .Select(i => new {
                i.Id, i.InvoiceNumber, i.Customer, i.InvoiceDate,
                i.Status, Total = i.Lines.Sum(l => l.Quantity * l.Price),
                ItemCount = i.Lines.Count
            })
            .ToListAsync();

        return Ok(new { success = true, data = invoices });
    }

    [HttpPost]
    public async Task<IActionResult> CreateInvoice([FromBody] CreateInvoiceRequest request)
    {
        var number = "INV-" + DateTime.Now.ToString("yyyyMMdd") + "-" + new Random().Next(100, 999);
        var invoice = Invoice.Create(number, request.Customer, request.Date, request.Description ?? "");

        foreach (var item in request.Items)
        {
            invoice.AddLine(item.ProductName, item.Quantity, item.Price);
        }

        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();

        var total = invoice.Lines.Sum(l => l.Quantity * l.Price);
        return Ok(new { success = true, message = "ok", data = new { invoice.Id, invoice.InvoiceNumber, Total = total } });
    }
}

public record CreateInvoiceRequest(string Customer, DateTime Date, string? Description, List<InvoiceItemRequest> Items);
public record InvoiceItemRequest(string ProductName, int Quantity, decimal Price);