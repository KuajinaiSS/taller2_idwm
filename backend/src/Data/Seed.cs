using backend.src.Models;

namespace backend.src.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            await SeedUsers(context);
        }
        
        private async static Task SeedUsers(DataContext context)
        {
            if (context.Clientes.Any()) return;

            var clientes = new List<Cliente>
            {
                new Cliente
                {
                    First_name = "Bob",
                    Last_name = "Bobberson",
                    Rut = "12345678-9",
                    Email = "email1.example.com",
                    Puntos = 0,
                },
                new Cliente
                {
                    First_name = "Jane",
                    Last_name = "Janerson",
                    Rut = "98765432-1",
                    Email = "email2.example.com",
                    Puntos = 0,
                },
                new Cliente
                {
                    First_name = "Alice",
                    Last_name = "Alicerson",
                    Rut = "12345678-9",
                    Email = "email3.example.com",
                    Puntos = 0,
                },
                new Cliente
                {
                    First_name = "John",
                    Last_name = "Johnson",
                    Rut = "98765432-1",
                    Email = "email.example.com",
                    Puntos = 0,
                },
                new Cliente
                {
                    First_name = "Ignacio Felipe",
                    Last_name = "Umaña Morel",
                    Rut = "20734484-2",
                    Email = "email.example.com",
                    Puntos = 160,
                },
            };

            await context.Clientes.AddRangeAsync(clientes);
            await context.SaveChangesAsync();
        }
    }
}
