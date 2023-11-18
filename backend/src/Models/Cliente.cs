using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.src.Models
{
    public class Cliente
    {
        public int Id { get; set; }

        public string First_name { get; set; } = string.Empty;

        public string Last_name { get; set; } = string.Empty;

        public string Rut { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public int Puntos { get; set; }
    }
}