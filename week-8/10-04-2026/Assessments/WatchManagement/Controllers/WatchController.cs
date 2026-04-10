using Microsoft.AspNetCore.Mvc;
using WatchManagement.DTOs;

namespace WatchManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchController : ControllerBase
    {
        // Temporary in-memory list (instead of DB)
        private static List<WatchDto> watches = new List<WatchDto>
        {
            new WatchDto
            {
                Id = 1,
                Brand = "Casio",
                Model = "F91W",
                Type = "Digital",
                Price = 1500,
                Currency = "INR",
                StrapMaterial = "Resin",
                DialColor = "Black",
                CaseMaterial = "Plastic",
                WaterResistance = 30,
                IsWaterResistant = true,
                IsSmartWatch = false,
                MovementType = "Quartz",
                CreatedAt = DateTime.UtcNow
            }
        };

        // 🔹 GET: api/watch
        [HttpGet]
        public ActionResult<IEnumerable<WatchDto>> GetAll()
        {
            return Ok(watches);
        }

        // 🔹 GET: api/watch/{id}
        [HttpGet("{id}")]
        public ActionResult<WatchDto> GetById(int id)
        {
            var watch = watches.FirstOrDefault(w => w.Id == id);

            if (watch == null)
                return NotFound("Watch not found");

            return Ok(watch);
        }

        // 🔹 POST: api/watch
        [HttpPost]
        public ActionResult<WatchDto> Create([FromBody] CreateWatchDto dto)
        {
            var watch = new WatchDto
            {
                Id = watches.Count + 1,
                Brand = dto.Brand,
                Model = dto.Model,
                Price = dto.Price,
                Type = dto.Type,
                StrapMaterial = dto.StrapMaterial,
                DialColor = dto.DialColor,
                CaseMaterial = dto.CaseMaterial,
                WaterResistance = dto.WaterResistance,
                IsWaterResistant = dto.IsWaterResistant,
                IsSmartWatch = dto.IsSmartWatch,
                MovementType = dto.MovementType,
                
                CreatedAt = DateTime.UtcNow
            };

            watches.Add(watch);

            return CreatedAtAction(nameof(GetById), new { id = watch.Id }, watch);
        }

        // 🔹 PUT: api/watch/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateWatchDto dto)
        {
            var watch = watches.FirstOrDefault(w => w.Id == id);

            if (watch == null)
                return NotFound("Watch not found");

            watch.Brand = dto.Brand;
            watch.Model = dto.Model;
            watch.Price = dto.Price;
            watch.Type = dto.Type;
            watch.StrapMaterial = dto.StrapMaterial;
            watch.DialColor = dto.DialColor;
            watch.CaseMaterial = dto.CaseMaterial;
            watch.WaterResistance = dto.WaterResistance;
            watch.IsWaterResistant = dto.IsWaterResistant;
            watch.IsSmartWatch = dto.IsSmartWatch;
            watch.MovementType = dto.MovementType;

            return NoContent();
        }

        // 🔹 DELETE: api/watch/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var watch = watches.FirstOrDefault(w => w.Id == id);

            if (watch == null)
                return NotFound("Watch not found");

            watches.Remove(watch);

            return NoContent();
        }
    }
}