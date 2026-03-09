using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
using ProductAPI.Models;
namespace ProductAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ProductController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }

        //GET: api/products/5
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        //POST: api/products
        [HttpPost]
        public IActionResult CreateProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        //PUT: api/products/5
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product updatedProduct)
        {
            if (id != updatedProduct.Id)
            {
                return BadRequest();
            }

            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.Quantity = updatedProduct.Quantity;

            _context.Entry(product).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        //DELETE: api/products/5
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult SearchProduct(string name)
        {
            var products = _context.Products
                .Where(p => p.Name.Contains(name))
                .ToList();

            if (products.Count == 0)
            {
                return NotFound("No product found");
            }

            return Ok(products);
        }
    }
}