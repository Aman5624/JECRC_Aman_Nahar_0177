namespace VenuePro.API.DTOs;

public class CatalogItemDto
{
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Icon { get; set; } = "📦";
    public string Category { get; set; } = string.Empty;
    public bool CustomPrice { get; set; } = false;
}