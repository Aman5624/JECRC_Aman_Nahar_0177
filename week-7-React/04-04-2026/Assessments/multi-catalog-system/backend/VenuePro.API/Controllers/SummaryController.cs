using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VenuePro.API.Data;

namespace VenuePro.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SummaryController : ControllerBase
{
    private readonly AppDbContext _db;
    public SummaryController(AppDbContext db) => _db = db;

    // GET api/summary/daily
    [HttpGet("daily")]
    public async Task<IActionResult> Daily([FromQuery] string? date)
    {
        var target = date != null && DateTime.TryParse(date, out var d) ? d.Date : DateTime.Today;

        var todayBills = await _db.Bills
            .Include(b => b.Items)
            .Where(b => b.CreatedAt.Date == target)
            .ToListAsync();

        var allBills = await _db.Bills.ToListAsync();

        var todayRevenue = todayBills.Sum(b => b.Total);
        var byCat = todayBills
            .SelectMany(b => b.Items)
            .GroupBy(i => i.Category)
            .ToDictionary(g => g.Key, g => g.Sum(i => i.Price * i.Qty));

        return Ok(new
        {
            date         = target.ToString("yyyy-MM-dd"),
            todayCount   = todayBills.Count,
            todayRevenue,
            avgTicket    = todayBills.Count > 0 ? todayRevenue / todayBills.Count : 0,
            allTimeBills = allBills.Count,
            allTimeRevenue = allBills.Sum(b => b.Total),
            revenueByCategory = byCat,
            recentTransactions = todayBills
                .OrderByDescending(b => b.CreatedAt)
                .Take(10)
                .Select(b => new { b.InvoiceNo, b.CustomerName, b.Total, b.CreatedAt })
        });
    }
}