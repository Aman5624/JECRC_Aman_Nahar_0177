namespace VenuePro.API.Models;

public class Bill
{
    public int Id { get; set; }
    public string InvoiceNo { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Customer Info
    public string? CustomerName { get; set; }
    public string? CustomerEmail { get; set; }
    public string? CustomerPhone { get; set; }

    // Pricing
    public decimal Discount { get; set; } = 0;
    public string DiscType { get; set; } = "pct";   // pct | fixed
    public decimal TaxRate { get; set; } = 18;
    public decimal Total { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public ICollection<BillItem> Items { get; set; } = new List<BillItem>();
}