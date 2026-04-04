namespace VenuePro.API.Models;

public class CatalogItem
{
    public int Id { get; set; }
    public string CatalogId { get; set; } = string.Empty;   // "e1", "d1" etc
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Icon { get; set; } = "📦";
    public string Category { get; set; } = string.Empty;    // entrance | donation | selling
    public bool CustomPrice { get; set; } = false;
    public DateTime CreatedAt { get; set; }
}