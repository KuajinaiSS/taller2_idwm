using System.ComponentModel.DataAnnotations;
namespace backend.src.DTO
{
    public class UpdateClientDto    
    {
        [Required (ErrorMessage = "El campo Nombre es obligatorio para registrar un cliente")]
        public string First_name { get; set; } = string.Empty;
        
        
        [Required (ErrorMessage = "El campo Apellido es obligatorio para registrar un cliente")]
        public string Last_name { get; set; } = string.Empty;


        [Required (ErrorMessage = "El campo Email es obligatorio para registrar un cliente")]
        [EmailAddress (ErrorMessage = "El Email debe ser una dirección de correo electrónico válida")]
        public string Email { get; set; } = string.Empty;
        

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "El valor de Puntos debe ser mayor a 0")]
        public int Puntos { get; set; } 
    }
}