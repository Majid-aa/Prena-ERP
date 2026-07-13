using Microsoft.AspNetCore.Mvc;

namespace Prena.Api.Controllers;

public class InventoryController : ApiControllerBase
{
    [HttpGet("transactions")]
    public IActionResult GetTransactions()
    {
        var transactions = new[]
        {
            new { Id = "1", Type = "receipt", ProductName = "محصول A", Quantity = 50, Date = "۱۴۰۳/۰۴/۱۵", Description = "رسید از تامین کننده" },
            new { Id = "2", Type = "issue", ProductName = "محصول B", Quantity = 20, Date = "۱۴۰۳/۰۴/۱۶", Description = "حواله به خط تولید" },
            new { Id = "3", Type = "receipt", ProductName = "مواد اولیه X", Quantity = 200, Date = "۱۴۰۳/۰۴/۱۰", Description = "خرید عمده" },
            new { Id = "4", Type = "issue", ProductName = "قطعه یدکی Y", Quantity = 5, Date = "۱۴۰۳/۰۴/۱۸", Description = "تعمیرات" },
        };

        return Ok(new { success = true, data = transactions });
    }

    [HttpPost("receipt")]
    public IActionResult CreateReceipt([FromBody] InventoryRequest request)
    {
        return Ok(new { success = true, message = $"رسید انبار برای {request.ProductId} به تعداد {request.Quantity} ثبت شد." });
    }

    [HttpPost("issue")]
    public IActionResult CreateIssue([FromBody] InventoryRequest request)
    {
        return Ok(new { success = true, message = $"حواله انبار برای {request.ProductId} به تعداد {request.Quantity} ثبت شد." });
    }
}

public record InventoryRequest(string ProductId, decimal Quantity, string Description);
