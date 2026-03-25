using Microsoft.AspNetCore.Mvc;
using MediLink.Api.Data;
using MediLink.Api.Models;

namespace MediLink.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly PasswordService _passwordService;

        public HomeController(AppDbContext context, PasswordService passwordService)
        {
            _context = context;
            _passwordService = passwordService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            var adminExists = _context.Users.Any(u => u.RoleId == 1);

            if (!adminExists)
            {
                var hashedPassword = _passwordService.HashPassword(dto.Password);
                var admin = new User
                {
                    UserName = dto.UserName,
                    Email = "admin@gmail.com",
                    LoginCode = "",
                    PasswordHash = hashedPassword,
                    RoleId = 1,
                    IsActive = true,
                    CreatedAt = DateTime.Now,
                    CreatedBy = "System",
                    LastUpdatedAt = DateTime.Now,
                    LastUpdatedBy = "System"
                };

                _context.Users.Add(admin);
                await _context.SaveChangesAsync();

                return Ok(new 
                { Message = "Admin Created Successfully",
                    userName = admin.UserName,
                    roleId = 1
                });
            }

            var user = _context.Users.FirstOrDefault(u => u.UserName == dto.UserName);

            if (user == null)
            {
                return Unauthorized("Invalid Username");
            }

            var isValid = _passwordService.VerifyPassword(user.PasswordHash, dto.Password);

            if (!isValid)
            {
                return Unauthorized("Invalid Password");
            }

            return Ok(new
            {
                message = "Login Successful",
                roleId = user.RoleId,
                userName = user.UserName
            });

            
        }
        [HttpGet]
            public IActionResult Get()
            {
                return Ok("Welcome to MediLink API! This message is coming from the HomeController.");
            }
    }
}