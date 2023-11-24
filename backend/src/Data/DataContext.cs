using Microsoft.EntityFrameworkCore;
namespace backend.src.Data

{
    public class DataContext : DbContext
    {
        // aca se agregan las tablas de la base de datos (entidades)
        public DbSet<Models.Cliente> Clientes { get; set; } = null!;
        public DbSet<Models.Administrador> Administradores { get; set; } = null!;
        
        public object Roles { get; internal set; }

        public DataContext(DbContextOptions options) : base(options)
        {
        }
    }
}