using Microsoft.AspNetCore.Mvc;

namespace Prena.Api.Controllers;

public class ModuleController : ApiControllerBase
{
    [HttpGet]
    public IActionResult GetModules()
    {
        var modules = new[]
        {
            new { Code = "CORE", Name = "هسته مرکزی", Price = 0, Active = true, Required = true },
            new { Code = "ACCOUNTING", Name = "حسابداری", Price = 2000000, Active = true, Required = false },
            new { Code = "TREASURY", Name = "خزانه داری", Price = 1000000, Active = true, Required = false },
            new { Code = "INVENTORY", Name = "انبارداری", Price = 1500000, Active = true, Required = false },
            new { Code = "SALES", Name = "فروش", Price = 2000000, Active = true, Required = false },
            new { Code = "CRM", Name = "مدیریت ارتباط با مشتریان", Price = 1000000, Active = false, Required = false },
            new { Code = "HRM", Name = "منابع انسانی و حقوق", Price = 2500000, Active = false, Required = false },
            new { Code = "FIXED_ASSETS", Name = "دارایی ثابت", Price = 1000000, Active = false, Required = false },
            new { Code = "CONTRACT", Name = "مدیریت قراردادها", Price = 1500000, Active = false, Required = false },
            new { Code = "BI", Name = "هوش تجاری", Price = 2000000, Active = false, Required = false },
            new { Code = "ECOMMERCE", Name = "فروشگاه اینترنتی", Price = 3000000, Active = false, Required = false },
            new { Code = "HELPDESK", Name = "پشتیبانی هوشمند", Price = 0, Active = true, Required = true },
            new { Code = "WORKFLOW", Name = "گردش کار", Price = 2000000, Active = false, Required = false },
        };

        return Ok(new { success = true, data = modules });
    }
}
