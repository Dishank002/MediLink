using Microsoft.AspNetCore.Mvc;

namespace MediLink.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Welcome to MediLink API! This message is coming from the HomeController.");
        }
    }
}