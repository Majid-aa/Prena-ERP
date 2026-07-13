using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prena.Infrastructure.Persistence;

namespace Prena.Api.Controllers;

public class ProductController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetProducts()
    {
        var products = new[]
        {
            new { Id = "1", Name = "محصول A", Code = "PRD-001", Quantity = 150, Unit = "عدد", Price = 250000M },
            new { Id = "2", Name = "محصول B", Code = "PRD-002", Quantity = 80, Unit = "کیلوگرم", Price = 180000M },
            new { Id = "3", Name = "محصول C", Code = "PRD-003", Quantity = 12, Unit = "عدد", Price = 1200000M },
            new { Id = "4", Name = "مواد اولیه X", Code = "RAW-001", Quantity = 500, Unit = "کیلوگرم", Price = 85000M },
            new { Id = "5", Name = "قطعه یدکی Y", Code = "SPR-001", Quantity = 45, Unit = "عدد", Price = 350000M },
        };

        return Ok(new { success = true, data = products });
    }

    [HttpGet("{id}")]
    public IActionResult GetProduct(string id)
    {
        return Ok(new { success = true, data = new { Id = id, Name = "محصول نمونه", Code = "PRD-" + id, Quantity = 100, Unit = "عدد", Price = 200000M } });
    }

    [HttpPost]
    public IActionResult CreateProduct([FromBody] CreateProductRequest request)
    {
        return Ok(new { success = true, message = "محصول با موفقیت ایجاد شد.", data = new { Id = Guid.NewGuid().ToString(), request.Name, request.Code } });
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(string id, [FromBody] UpdateProductRequest request)
    {
        return Ok(new { success = true, message = "محصول بروزرسانی شد." });
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(string id)
    {
        return Ok(new { success = true, message = "محصول حذف شد." });
    }
}

public record CreateProductRequest(string Name, string Code, string Unit, decimal Price);
public record UpdateProductRequest(string? Name, string? Code, string? Unit, decimal? Price);
