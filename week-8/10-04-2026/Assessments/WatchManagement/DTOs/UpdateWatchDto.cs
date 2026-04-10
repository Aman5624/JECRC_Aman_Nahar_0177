namespace WatchManagement.DTOs
{
    public class UpdateWatchDto
    {
        public string Brand { get; set; } = string.Empty;

        public string Model { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string Type { get; set; } = string.Empty;

        public string StrapMaterial { get; set; } = string.Empty;

        public string DialColor { get; set; } = string.Empty;

        public string CaseMaterial { get; set; } = string.Empty;

        public double WaterResistance { get; set; }

        public bool IsWaterResistant { get; set; }

        public bool IsSmartWatch { get; set; }

        public string MovementType { get; set; } = string.Empty;
    }
}