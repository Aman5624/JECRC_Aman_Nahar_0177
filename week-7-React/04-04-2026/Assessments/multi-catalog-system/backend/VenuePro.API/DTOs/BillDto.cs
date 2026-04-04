namespace VenuePro.API.DTOs;

// Used for Create/Update requests
public class BillItemDto
{
    public string Name { get; set; } = string.Empty;
    public string Icon { get; set; } = "📦";
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Qty { get; set; } = 1;
}

public class CreateBillDto
{
    public string InvoiceNo { get; set; } = string.Empty;
    public string? CustomerName { get; set; }
    public string? CustomerEmail { get; set; }
    public string? CustomerPhone { get; set; }
    public decimal Discount { get; set; } = 0;
    public string DiscType { get; set; } = "pct";
    public decimal TaxRate { get; set; } = 18;
    public decimal Total { get; set; }
    public string? Notes { get; set; }
    public List<BillItemDto> Items { get; set; } = new();
}

// Used for responses back to frontend
public class BillResponseDto
{
    public int Id { get; set; }
    public string InvoiceNo { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string? CustomerName { get; set; }
    public string? CustomerEmail { get; set; }
    public string? CustomerPhone { get; set; }
    public decimal Discount { get; set; }
    public string DiscType { get; set; } = "pct";
    public decimal TaxRate { get; set; }
    public decimal Total { get; set; }
    public string? Notes { get; set; }
    public List<BillItemDto> Items { get; set; } = new();
}