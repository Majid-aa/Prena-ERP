using Microsoft.AspNetCore.Mvc;

namespace Prena.Api.Controllers;

public class SalesController : ApiControllerBase
{
    [HttpGet]
    public IActionResult GetInvoices()
    {
        var invoices = new[]
        {
            new { Id = "1", Customer = "شرکت بازرگانی آسمان", Date = "۱۴۰۳/۰۴/۱۵", Total = 12500000M, Status = "paid" },
            new { Id = "2", Customer = "فروشگاه دیجی کالا", Date = "۱۴۰۳/۰۴/۱۴", Total = 8500000M, Status = "pending" },
            new { Id = "3", Customer = "کارخانه البرز", Date = "۱۴۰۳/۰۴/۱۰", Total = 32000000M, Status = "paid" },
        };

        return Ok(new { success = true, data = invoices });
    }

    [HttpPost]
    public IActionResult CreateInvoice([FromBody] CreateInvoiceRequest request)
    {
        var total = request.Items.Sum(i => i.Quantity * i.Price);
        return Ok(new { success = true, message = $"فاکتور فروش به مبلغ {total:N0} ریال ثبت شد.", data = new { Id = Guid.NewGuid().ToString(), request.Customer, Total = total } });
    }
}

public record CreateInvoiceRequest(string Customer, List<InvoiceItemRequest> Items);
public record InvoiceItemRequest(string ProductName, int Quantity, decimal Price);
