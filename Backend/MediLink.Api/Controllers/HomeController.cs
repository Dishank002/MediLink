using Microsoft.AspNetCore.Mvc;
using MediLink.Core.DTOs;
using MediLink.Core.Interfaces;
using System.Threading.Tasks;

namespace MediLink.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly IAuthService _authService;

        public HomeController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            var result = await _authService.LoginAsync(dto);

            if (!result.Success)
            {
                if (result.Message == "Invalid Username" || result.Message == "Invalid Password")
                {
                    return Unauthorized(result.Message);
                }
                return BadRequest(result.Message);
            }

            return Ok(new
            {
                message = result.Message,
                roleId = result.RoleId,
                userName = result.UserName
            });
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Welcome to MediLink API! This message is coming from the HomeController.");
        }
    }
}