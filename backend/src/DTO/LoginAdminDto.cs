using System.ComponentModel.DataAnnotations;
namespace backend.src.DTO

{
    public class LoginAdminDto
    {
        [Required (ErrorMessage = "El campo Usuario es obligatorio para iniciar sesión")]
        public string User { get; set; } = string.Empty;


        [Required (ErrorMessage = "El campo Contraseña es obligatorio para iniciar sesión")]
        public string Password { get; set; } = string.Empty;
    }
}