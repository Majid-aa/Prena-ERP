using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prena.Infrastructure.Persistence;
using Prena.Domain.Entities;

namespace Prena.Api.Controllers;

public class ProductController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _context.Products
            .Where(p => p.IsActive)
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new
            {
                p.Id, p.Name, p.Code, p.Unit, p.Price, p.Quantity, p.CreatedAt
            })
            .ToListAsync();

        return Ok(new { success = true, data = products });
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductRequest request)
    {
        var product = Product.Create(request.Name, request.Code, request.Unit, request.Price);
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return Ok(new { success = true, message = "ok", data = new { product.Id, product.Name } });
    }
}

public record CreateProductRequest(string Name, string Code, string Unit, decimal Price);