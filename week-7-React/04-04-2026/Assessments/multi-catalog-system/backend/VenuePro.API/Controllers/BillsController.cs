using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VenuePro.API.Data;
using VenuePro.API.DTOs;
using VenuePro.API.Models;

namespace VenuePro.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BillsController : ControllerBase
{
    private readonly AppDbContext _db;
    public BillsController(AppDbContext db) => _db = db;

    // GET api/bills
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] string? date)
    {
        var query = _db.Bills.Include(b => b.Items).AsQueryable();

        if (!string.IsNullOrEmpty(search))
            query = query.Where(b =>
                b.InvoiceNo.Contains(search) ||
                (b.CustomerName != null && b.CustomerName.Contains(search)));

        if (!string.IsNullOrEmpty(date) && DateTime.TryParse(date, out var parsedDate))
            query = query.Where(b => b.CreatedAt.Date == parsedDate.Date);

        var bills = await query.OrderByDescending(b => b.CreatedAt).ToListAsync();
        return Ok(bills.Select(MapToResponse));
    }

    // GET api/bills/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var bill = await _db.Bills.Include(b => b.Items).FirstOrDefaultAsync(b => b.Id == id);
        if (bill is null) return NotFound();
        return Ok(MapToResponse(bill));
    }

    // POST api/bills
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBillDto dto)
    {
        if (!dto.Items.Any())
            return BadRequest("Bill must have at least one item.");

        var bill = new Bill
        {
            InvoiceNo     = dto.InvoiceNo,
            CreatedAt     = DateTime.UtcNow,
            CustomerName  = dto.CustomerName,
            CustomerEmail = dto.CustomerEmail,
            CustomerPhone = dto.CustomerPhone,
            Discount      = dto.Discount,
            DiscType      = dto.DiscType,
            TaxRate       = dto.TaxRate,
            Total         = dto.Total,
            Notes         = dto.Notes,
            Items         = dto.Items.Select(i => new BillItem
            {
                Name     = i.Name,
                Icon     = i.Icon,
                Category = i.Category,
                Price    = i.Price,
                Qty      = i.Qty,
            }).ToList()
        };

        _db.Bills.Add(bill);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = bill.Id }, MapToResponse(bill));
    }

    // DELETE api/bills/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var bill = await _db.Bills.FindAsync(id);
        if (bill is null) return NotFound();
        _db.Bills.Remove(bill);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // GET api/bills/export/csv
    [HttpGet("export/csv")]
    public async Task<IActionResult> ExportCsv()
    {
        var bills = await _db.Bills.Include(b => b.Items).OrderByDescending(b => b.CreatedAt).ToListAsync();

        var csv = new System.Text.StringBuilder();
        csv.AppendLine("InvoiceNo,Date,Customer,Items,Discount,TaxRate,Total");

        foreach (var b in bills)
        {
            var items = string.Join("|", b.Items.Select(i => $"{i.Name}({i.Qty})"));
            csv.AppendLine($"{b.InvoiceNo},{b.CreatedAt:yyyy-MM-dd},{b.CustomerName ?? "Walk-in"},{items},{b.Discount},{b.TaxRate},{b.Total}");
        }

        var bytes = System.Text.Encoding.UTF8.GetBytes(csv.ToString());
        return File(bytes, "text/csv", $"bills-{DateTime.Today:yyyy-MM-dd}.csv");
    }

    // Helper
    private static BillResponseDto MapToResponse(Bill b) => new()
    {
        Id            = b.Id,
        InvoiceNo     = b.InvoiceNo,
        CreatedAt     = b.CreatedAt,
        CustomerName  = b.CustomerName,
        CustomerEmail = b.CustomerEmail,
        CustomerPhone = b.CustomerPhone,
        Discount      = b.Discount,
        DiscType      = b.DiscType,
        TaxRate       = b.TaxRate,
        Total         = b.Total,
        Notes         = b.Notes,
        Items         = b.Items.Select(i => new BillItemDto
        {
            Name     = i.Name,
            Icon     = i.Icon,
            Category = i.Category,
            Price    = i.Price,
            Qty      = i.Qty,
        }).ToList()
    };
}