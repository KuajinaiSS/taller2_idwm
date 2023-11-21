namespace backend.src.DTO
{
    // La respuesta del login sera el token y el usuario
    public class LoginResponseDto
    {
        public string Token { get; set; } = null!; 

        public string User { get; set; } = null!; 
    }
}