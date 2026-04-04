using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VenuePro.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    DiscType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TaxRate = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CatalogItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CatalogId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CustomPrice = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BillItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BillId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Qty = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillItems_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "CatalogItems",
                columns: new[] { "Id", "CatalogId", "Category", "CreatedAt", "CustomPrice", "Icon", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "e1", "entrance", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "🎫", "Adult Ticket", 250m },
                    { 2, "e2", "entrance", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "🧒", "Child Ticket", 120m },
                    { 3, "e3", "entrance", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "👴", "Senior Ticket", 150m },
                    { 4, "e4", "entrance", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "⭐", "VIP Pass", 750m },
                    { 5, "e5", "entrance", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "👥", "Group (10+)", 180m },
                    { 6, "d1", "donation", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "🥉", "Bronze Donor", 100m },
                    { 7, "d2", "donation", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "🥈", "Silver Donor", 500m },
                    { 8, "d3", "donation", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "🥇", "Gold Donor", 1000m },
                    { 9, "d4", "donation", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "💎", "Platinum Donor", 5000m },
                    { 10, "d5", "donation", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "❤️", "Custom Donation", 0m },
                    { 11, "s1", "selling", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "👕", "Museum T-Shirt", 499m },
                    { 12, "s2", "selling", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "☕", "Souvenir Mug", 199m },
                    { 13, "s3", "selling", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "🖼️", "Art Print", 350m },
                    { 14, "s4", "selling", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "📖", "Guidebook", 150m },
                    { 15, "s5", "selling", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "🍿", "Snack Combo", 120m },
                    { 16, "s6", "selling", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "🔑", "Premium Keychain", 99m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillItems_BillId",
                table: "BillItems",
                column: "BillId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillItems");

            migrationBuilder.DropTable(
                name: "CatalogItems");

            migrationBuilder.DropTable(
                name: "Bills");
        }
    }
}
