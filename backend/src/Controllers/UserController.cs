using backend.src.Data;
using backend.src.DTO;
using backend.src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }



        // REGISTRA AL CLIENTE
        // TODO VALIDAR SI ES QUE VA A INICAR CON 0 PUNTOS
        // http://localhost:5019/api/user/register
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(RegisterClientDto registerClientDto)
        {
            // Buscamos si ya existe un cliente con el mismo email o rut
            var existingClient = await _context.Clientes.FirstOrDefaultAsync(c => c.Email == registerClientDto.Email || c.Rut == registerClientDto.Rut);
            if (existingClient != null) return Conflict("Email o RUT ya registrado");


            var usuario = new Cliente()
            {
                First_name = registerClientDto.First_name,
                Last_name = registerClientDto.Last_name,
                Rut = registerClientDto.Rut,
                Email = registerClientDto.Email,
                Puntos = registerClientDto.Puntos, // validar si es que va a inicar con 0 puntos o no
            };

            var createdUser = (await _context.Clientes.AddAsync(usuario)).Entity;
            await _context.SaveChangesAsync();

            return Ok("Cliente Registrado");
        }



        // DESPLIEGUA A TODOS LOS CLIENTES
        // http://localhost:5019/api/user/AllClients
        [HttpGet("AllClients")]
        public async Task<ActionResult<List<Cliente>>> AllClients()
        {
            var clientes = await _context.Clientes.ToListAsync();
            return clientes;
        }



        // BUSCA AL CLIENTE POR EL RUT Y RETORNA AL CLIENTE
        // http://localhost:5019/api/user/getClientRut/{rut}
        [HttpGet("getClientRut/{rut}")]
        public async Task<ActionResult<Cliente>> GetClient(string rut)
        {
            var cliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Rut == rut);
            if (cliente == null) return NotFound("Cliente no encontrado");
            return cliente;
        }



        // BUSCA AL CLIENTE POR EL EMAIL Y RETORNA AL CLIENTE
        // http://localhost:5019/api/user/getClientEmail/{email}
        [HttpGet("getClientEmail/{email}")]
        public async Task<ActionResult<Cliente>> GetClientEmail(string email)
        {
            var cliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Email == email);
            if (cliente == null) return NotFound("Cliente no encontrado");
            return cliente;
        }




        // Eliminar al cliente por el rut
        // http://localhost:5019/api/user/deleteClient/{rut}
        [HttpDelete("deleteClient/{rut}")]
        public async Task<ActionResult<Cliente>> DeleteClient(string rut)
        {
            var clienteDelete = await _context.Clientes.FirstOrDefaultAsync(c => c.Rut == rut);
            if (clienteDelete == null) return NotFound("Cliente no encontrado");

            _context.Clientes.Remove(clienteDelete);
            await _context.SaveChangesAsync();
            //return clienteDelete
            return Ok("Cliente eliminado");
        }




        // Eliminar al cliente por el email
        // http://localhost:5019/api/user/deleteClientEmail/{email}
        [HttpDelete("deleteClientEmail/{email}")]
        public async Task<ActionResult<Cliente>> DeleteClientEmail(string email)
        {
            var clienteDelete = await _context.Clientes.FirstOrDefaultAsync(c => c.Email == email);
            if (clienteDelete == null) return NotFound("Cliente no encontrado");

            _context.Clientes.Remove(clienteDelete);
            await _context.SaveChangesAsync();
            //return clienteDelete;
            return Ok("Cliente eliminado");
        }





        // ACTUALIZA LOS DATOS DEL CLIENTE
        // TODO validar que pasa si solo modifico un campo
        // [HttpPut("updateClient/{rut}")]
        // public async Task<ActionResult<Cliente>> UpdateClient(string rut)
        // {
        //     var clienteToUpdate = await _context.Clientes.FirstOrDefaultAsync(c => c.Rut == rut);
        //     if (clienteToUpdate == null) return NotFound("Cliente no encontrado");


        //     clienteToUpdate.First_name = 
        //     clienteToUpdate.Last_name = cliente.Last_name;
        //     clienteToUpdate.Email = cliente.Email;
        //     clienteToUpdate.Puntos = cliente.Puntos;

        //     await _context.SaveChangesAsync();
        //     return clienteToUpdate;
        // }
    }
}