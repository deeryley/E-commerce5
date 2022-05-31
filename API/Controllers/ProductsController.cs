using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using API.Data;
using API.Entities;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ProductsController : ControllerBase
    {
        private readonly Contexts _context;
        public ProductsController(Contexts context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();

        }

        [HttpGet("{id}")] // get product by ID

        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }



    }
}
