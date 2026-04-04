using Microsoft.EntityFrameworkCore;
using VenuePro.API.Models;

namespace VenuePro.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Bill> Bills { get; set; }
    public DbSet<BillItem> BillItems { get; set; }
    public DbSet<CatalogItem> CatalogItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Bill → BillItems (cascade delete)
        modelBuilder.Entity<Bill>()
            .HasMany(b => b.Items)
            .WithOne(i => i.Bill)
            .HasForeignKey(i => i.BillId)
            .OnDelete(DeleteBehavior.Cascade);

        // Decimal precision
        modelBuilder.Entity<Bill>()
            .Property(b => b.Total).HasPrecision(18, 2);
        modelBuilder.Entity<Bill>()
            .Property(b => b.Discount).HasPrecision(18, 2);
        modelBuilder.Entity<Bill>()
            .Property(b => b.TaxRate).HasPrecision(5, 2);
        modelBuilder.Entity<BillItem>()
            .Property(i => i.Price).HasPrecision(18, 2);
        modelBuilder.Entity<CatalogItem>()
            .Property(c => c.Price).HasPrecision(18, 2);

        // Seed initial catalog data
        modelBuilder.Entity<CatalogItem>().HasData(
            new CatalogItem { Id = 1,  CatalogId = "e1", Name = "Adult Ticket",    Price = 250m,  Icon = "🎫", Category = "entrance" },
            new CatalogItem { Id = 2,  CatalogId = "e2", Name = "Child Ticket",    Price = 120m,  Icon = "🧒", Category = "entrance" },
            new CatalogItem { Id = 3,  CatalogId = "e3", Name = "Senior Ticket",   Price = 150m,  Icon = "👴", Category = "entrance" },
            new CatalogItem { Id = 4,  CatalogId = "e4", Name = "VIP Pass",        Price = 750m,  Icon = "⭐", Category = "entrance" },
            new CatalogItem { Id = 5,  CatalogId = "e5", Name = "Group (10+)",     Price = 180m,  Icon = "👥", Category = "entrance" },
            new CatalogItem { Id = 6,  CatalogId = "d1", Name = "Bronze Donor",    Price = 100m,  Icon = "🥉", Category = "donation" },
            new CatalogItem { Id = 7,  CatalogId = "d2", Name = "Silver Donor",    Price = 500m,  Icon = "🥈", Category = "donation" },
            new CatalogItem { Id = 8,  CatalogId = "d3", Name = "Gold Donor",      Price = 1000m, Icon = "🥇", Category = "donation" },
            new CatalogItem { Id = 9,  CatalogId = "d4", Name = "Platinum Donor",  Price = 5000m, Icon = "💎", Category = "donation" },
            new CatalogItem { Id = 10, CatalogId = "d5", Name = "Custom Donation", Price = 0m,    Icon = "❤️", Category = "donation", CustomPrice = true },
            new CatalogItem { Id = 11, CatalogId = "s1", Name = "Museum T-Shirt",  Price = 499m,  Icon = "👕", Category = "selling"  },
            new CatalogItem { Id = 12, CatalogId = "s2", Name = "Souvenir Mug",    Price = 199m,  Icon = "☕", Category = "selling"  },
            new CatalogItem { Id = 13, CatalogId = "s3", Name = "Art Print",       Price = 350m,  Icon = "🖼️", Category = "selling"  },
            new CatalogItem { Id = 14, CatalogId = "s4", Name = "Guidebook",       Price = 150m,  Icon = "📖", Category = "selling"  },
            new CatalogItem { Id = 15, CatalogId = "s5", Name = "Snack Combo",     Price = 120m,  Icon = "🍿", Category = "selling"  },
            new CatalogItem { Id = 16, CatalogId = "s6", Name = "Premium Keychain",Price = 99m,   Icon = "🔑", Category = "selling"  }
        );
    }
}