using backend.src.DTO;
using backend.src.Data;
using Microsoft.AspNetCore.Mvc;
using backend.src.Services.Interfaces;

namespace backend.src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        // private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;

        // Inyectamos el contexto para poder acceder a la base de datos
        // IConfiguration traemos del appsettings.json el secret del JWT
        public AuthController(DataContext context, IAuthService authService)
        {
            // Guardamos en un atributo para utilizarlo cuando lo necesitemos
            _context = context;
            _authService = authService;
        }

        // METODO LOGIN
        // La ruta es localhost:5019/api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login(LoginAdminDto loginAdminDto)
        {
            Thread.Sleep(1000);
            var respuesta = await _authService.Login(loginAdminDto);
            if (respuesta is null) return BadRequest("Credenciales inválidas");
            return Ok(respuesta);
        }





        // ************************************************************************************
        // ****************************** CODIGO OBSOLETO *************************************
        // ************************************************************************************

        // // METODO LOGIN ADMIN
        // // La ruta es localhost:5019/api/auth/login 
        // [HttpPost("login")]
        // public async Task<ActionResult<LoginResponseDto>> Login(LoginAdminDto loginAdminDto)
        // {
        //     // Buscar al administrador por su user 
        //     var admin = await _context.Administradores.FirstOrDefaultAsync(a => a.User == loginAdminDto.User);

        //     // Si el administrador es nulo es porque no existe, así que retornamos credenciales inválidas  -> Http 400 BadRequest 
        //     if (admin is null) return BadRequest("Credenciales inválidas");

        //     // Comparamos la clave ingresada con la clave guardad en la base de datos 
        //     // var result = BCrypt.Net.BCrypt.Verify(loginAdminDto.Password, admin.Password);
        //     var result = loginAdminDto.Password == admin.Password;
            

        //     // Si no coinciden entonces retornamos credenciales inválidas -> Http 400 BadRequest
        //     if(!result) return BadRequest("Credenciales inválidas");
            
        //     // Si llegamos hasta acá es porque el administrador existe y las credenciales son válidas
        //     // estamos devolviendo el token en el body de la respuesta (postman)
        //     var token = CreateToken(admin);

        //     return Ok(token);
        // }


        // // CREAMOS EL JWT        
        // // Se asume que se tiene el secret del JWT en AppSettings:Token 
        // // Esto se debe colocar en algún servicio (controlador por ahora igual nos servirá)
        // private string CreateToken(Administrador administrador)
        // {
        //     // aca definimos que va a contener el token podemos agregar mas cosas como el nombre, el rut, etc en este caso solo agregaremos el email simepre tiene que ser lo mas liviano posible
        //     var claims = new List<Claim>{
        //         new ("Admin", administrador.User),
        //     };

        //     // firmar el token con el secret del appsettings.json
        //     var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
        //             _configuration.GetSection("AppSettings:Token").Value!));


        //     // creamos las credenciales para el token
        //     var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
        //     // creamos el token 
        //     var token = new JwtSecurityToken(
        //         claims: claims,
        //         // definimos que expirara en 1 dia
        //         expires: DateTime.Now.AddDays(1),
        //         signingCredentials: creds
        //     );

        //     var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        //     return jwt;
        // }

        
        
    }
}