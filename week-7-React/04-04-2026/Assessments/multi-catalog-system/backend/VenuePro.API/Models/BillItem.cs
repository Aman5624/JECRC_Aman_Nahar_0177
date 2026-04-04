namespace VenuePro.API.Models;

public class BillItem
{
    public int Id { get; set; }
    public int BillId { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Icon { get; set; } = "📦";
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Qty { get; set; } = 1;

    // Navigation
    public Bill Bill { get; set; } = null!;
}