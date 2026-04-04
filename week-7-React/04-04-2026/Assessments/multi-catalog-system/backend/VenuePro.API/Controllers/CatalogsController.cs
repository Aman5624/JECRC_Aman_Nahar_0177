using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VenuePro.API.Data;
using VenuePro.API.DTOs;
using VenuePro.API.Models;

namespace VenuePro.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CatalogsController : ControllerBase
{
    private readonly AppDbContext _db;
    public CatalogsController(AppDbContext db) => _db = db;

    // GET api/catalogs
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _db.CatalogItems.OrderBy(c => c.Category).ThenBy(c => c.Id).ToListAsync();

        // Group by category to match frontend shape: { entrance: [...], donation: [...], selling: [...] }
        var grouped = items.GroupBy(i => i.Category)
            .ToDictionary(g => g.Key, g => g.Select(i => new
            {
                id          = i.CatalogId,
                dbId        = i.Id,
                name        = i.Name,
                price       = i.Price,
                icon        = i.Icon,
                category    = i.Category,
                customPrice = i.CustomPrice,
            }));

        return Ok(grouped);
    }

    // GET api/catalogs/{category}
    [HttpGet("{category}")]
    public async Task<IActionResult> GetByCategory(string category)
    {
        var items = await _db.CatalogItems
            .Where(c => c.Category == category)
            .OrderBy(c => c.Id)
            .ToListAsync();
        return Ok(items);
    }

    // POST api/catalogs
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CatalogItemDto dto)
    {
        var item = new CatalogItem
        {
            CatalogId   = $"{dto.Category[0]}{DateTime.UtcNow.Ticks}",
            Name        = dto.Name,
            Price       = dto.Price,
            Icon        = dto.Icon,
            Category    = dto.Category,
            CustomPrice = dto.CustomPrice,
        };
        _db.CatalogItems.Add(item);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetByCategory), new { category = item.Category }, item);
    }

    // PUT api/catalogs/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CatalogItemDto dto)
    {
        var item = await _db.CatalogItems.FindAsync(id);
        if (item is null) return NotFound();

        item.Name        = dto.Name;
        item.Price       = dto.Price;
        item.Icon        = dto.Icon;
        item.CustomPrice = dto.CustomPrice;

        await _db.SaveChangesAsync();
        return Ok(item);
    }

    // DELETE api/catalogs/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.CatalogItems.FindAsync(id);
        if (item is null) return NotFound();
        _db.CatalogItems.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}