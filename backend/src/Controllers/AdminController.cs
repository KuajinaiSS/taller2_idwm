using backend.src.Data;
using Microsoft.AspNetCore.Mvc;

namespace backend.src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        
        public AdminController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        

    }
}