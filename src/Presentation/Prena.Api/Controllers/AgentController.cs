using Microsoft.AspNetCore.Mvc;

namespace Prena.Api.Controllers;

public class AgentController : ApiControllerBase
{
    [HttpGet]
    public IActionResult GetAgents()
    {
        var agents = new[]
        {
            new { Id = "1", Name = "محمد رضایی", Mobile = "09121112233", Level = "senior", Customers = 45, Status = "active", JoinDate = "۱۴۰۲/۰۳/۱۵" },
            new { Id = "2", Name = "زهرا موسوی", Mobile = "09123334455", Level = "junior", Customers = 22, Status = "active", JoinDate = "۱۴۰۳/۰۱/۲۰" },
            new { Id = "3", Name = "علی کریمی", Mobile = "09125556677", Level = "team_lead", Customers = 120, Status = "active", JoinDate = "۱۴۰۱/۰۸/۰۵" },
        };

        return Ok(new { success = true, data = agents });
    }
}
