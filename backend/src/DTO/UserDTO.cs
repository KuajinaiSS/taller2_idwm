// sin usar por que no existe password que filtrar por el momento

namespace backend.src.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }

        public string First_name { get; set; } = string.Empty;

        public string Last_name { get; set; } = string.Empty;

        public string Rut { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public int Puntos { get; set; }
    }
}