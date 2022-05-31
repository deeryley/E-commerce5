using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Contexts : DbContext
    {
        public Contexts(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

    }
}
