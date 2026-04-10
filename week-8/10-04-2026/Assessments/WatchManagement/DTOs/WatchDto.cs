namespace WatchManagement.DTOs
{
    public class WatchDto
    {
        public int Id { get; set; }

        public string Brand { get; set; } = string.Empty;

        public string Model { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty; // Analog, Digital, Smart

        public decimal Price { get; set; }

        public string Currency { get; set; } = "INR";

        public string StrapMaterial { get; set; } = string.Empty;

        public string DialColor { get; set; } = string.Empty;

        public string CaseMaterial { get; set; } = string.Empty;

        public double WaterResistance { get; set; } 

        public bool IsWaterResistant { get; set; }

        public bool IsSmartWatch { get; set; }

        public string MovementType { get; set; } = string.Empty; // Quartz, Automatic

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}