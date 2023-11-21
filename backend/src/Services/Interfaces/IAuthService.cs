using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.src.DTO;

namespace backend.src.Services.Interfaces
{
    public interface IAuthService
    {

        /// <summary>
        /// Realiza el proceso de autenticación de un usuario.
        /// </summary>
        /// <param name="loginAdminDto">DTO con los datos de inicio de sesión del administrador.</param>
        /// <returns>Objeto LoginResponseDto con el token de autenticación y el usuario.</returns>
        Task<LoginResponseDto> Login(LoginAdminDto loginAdminDto);



        
    }
}