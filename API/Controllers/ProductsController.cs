using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extenstions;
using API.Data;
using API.Entities;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{


    public class ProductsController : ApiController
    {
        private readonly Contexts _context;
        public ProductsController( Contexts context )
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts( string orderBy, string input, string brands, string types )
        {
            var query = _context.Products
                .Sort( orderBy )
                .Search( input )
                .Filter( brands, types )
                .AsQueryable();

            return await query.ToListAsync();
        }

        [HttpGet( "{id}" )] // get product by ID

        public async Task<ActionResult<Product>> GetProduct( int id )
        {
            var product = await _context.Products.FindAsync( id );
            if ( product == null ) return NotFound();
            return product;
        }

        [HttpGet( "filters" )]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select( p => p.Brand ).Distinct().ToListAsync();
            var types = await _context.Products.Select( p => p.Type ).Distinct().ToListAsync();

            return Ok( new { brands, types } );

        }

    }
}
