using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prena.Infrastructure.Persistence;
using Prena.Domain.Entities;

namespace Prena.Api.Controllers;

public class VoucherController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;

    public VoucherController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetVouchers()
    {
        var vouchers = await _context.Vouchers
            .OrderByDescending(v => v.CreatedAt)
            .Take(50)
            .Select(v => new
            {
                v.Id,
                v.VoucherNumber,
                v.VoucherDate,
                v.Description,
                v.Status,
                v.CreatedAt,
                Lines = v.Lines.Select(l => new { l.AccountId, l.Debit, l.Credit, l.Description })
            })
            .ToListAsync();

        return Ok(new { success = true, data = vouchers });
    }

    [HttpPost]
    public async Task<IActionResult> CreateVoucher([FromBody] CreateVoucherRequest request)
    {
        var totalDebit = request.Lines.Sum(l => l.Debit);
        var totalCredit = request.Lines.Sum(l => l.Credit);

        if (totalDebit != totalCredit || totalDebit == 0)
            return BadRequest(new { success = false, message = "سند توازن ندارد. جمع بدهکار و بستانکار باید برابر باشد." });

        var voucherNumber = $"ACC-{DateTime.Now:yyyyMMdd}-{new Random().Next(1000, 9999)}";
        var voucher = Voucher.Create(voucherNumber, request.VoucherDate, request.Description);

        foreach (var line in request.Lines)
        {
            voucher.AddLine(line.AccountId, line.Debit, line.Credit, line.Description);
        }

        _context.Vouchers.Add(voucher);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "سند با موفقیت ثبت شد.", data = new { voucher.Id, voucher.VoucherNumber } });
    }
}

public record CreateVoucherRequest(DateTime VoucherDate, string Description, List<VoucherLineRequest> Lines);
public record VoucherLineRequest(Guid AccountId, decimal Debit, decimal Credit, string Description);
