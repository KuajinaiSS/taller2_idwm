namespace backend.src.Models
{
    public class Administrador
    {
        public int Id { get; set; }

        public string User { get; set; } = string.Empty; 

        public string Password { get; set; } = string.Empty;
    }
}