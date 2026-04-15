using Microsoft.AspNetCore.Mvc;
using MediLink.Core.DTOs;
using MediLink.Core.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

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

            Response.Cookies.Append("token", result.Token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(60)
            });

            return Ok(new
            {
                // token = result.Token,
                message = result.Message,
                roleId = result.RoleId,
                userName = result.UserName
            });
        }

        // [Authorize]
        [HttpGet]
        public IActionResult Get()
        
        {
            return Ok("Welcome to MediLink API! This message is coming from the HomeController. JWT is Successufully Implemented.");
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult me()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            var role = User.FindFirstValue(ClaimTypes.Role);

            if(userName == null)
            {
                
                return Unauthorized("User not authenticated");
            }
            return Ok(new
            {
                userName,
                role
            });
        } 


    }
}