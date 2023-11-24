using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.src.Data;
using backend.src.DTO;
using backend.src.Models;
using backend.src.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace backend.src.Services
{
    public class AuthService : IAuthService
    {

        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        // Inyectamos el contexto para poder acceder a la base de datos
        // IConfiguration traemos del appsettings.json el secret del JWT
        public AuthService(DataContext context, IConfiguration configuration)
        {
            // Guardamos en un atributo para utilizarlo cuando lo necesitemos
            _context = context;
            _configuration = configuration;
        }


        public async Task<LoginResponseDto> Login(LoginAdminDto loginAdminDto)
        {
            // Buscar al administrador por su user 
            var admin = await _context.Administradores.FirstOrDefaultAsync(a => a.User == loginAdminDto.User);

            // Si el administrador es nulo es porque no existe, así que retornamos credenciales inválidas  -> Http 400 BadRequest 
            if (admin is null) return null;

            // Comparamos la clave ingresada con la clave guardad en la base de datos 
            // validPassword result = BCrypt.Net.BCrypt.Verify(loginAdminDto.Password, admin.Password);
            var validPassword = loginAdminDto.Password == admin.Password;

            // Si no coinciden entonces retornamos credenciales inválidas -> Http 400 BadRequest
            if (!validPassword) return null;

            // Si llegamos hasta acá es porque el administrador existe y las credenciales son válidas
            // estamos devolviendo el token en el body de la respuesta (postman)

            var token = CreateToken(admin);

            var loginResponse = new LoginResponseDto
            {
                Token = token,
                User = admin.User
            };

            return loginResponse;
        }

        // CREAMOS EL JWT        
        // Se asume que se tiene el secret del JWT en AppSettings:Token 
        // Esto se debe colocar en algún servicio (controlador por ahora igual nos servirá)
        private string CreateToken(Administrador administrador)
        {
            // aca definimos que va a contener el token podemos agregar mas cosas como el nombre, el rut, etc en este caso solo agregaremos el email simepre tiene que ser lo mas liviano posible
            var claims = new List<Claim>{
                new ("Admin", administrador.User),
            };

            // firmar el token con el secret del appsettings.json
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                    _configuration.GetSection("AppSettings:Token").Value!));


            // creamos las credenciales para el token
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            // creamos el token 
            var token = new JwtSecurityToken(
                claims: claims,
                // definimos que expirara en 1 dia
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}