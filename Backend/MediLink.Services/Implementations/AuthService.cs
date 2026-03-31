using MediLink.Core.DTOs;
using MediLink.Core.Interfaces;
using MediLink.Core.Models;
using System;
using System.Threading.Tasks;

namespace MediLink.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly PasswordService _passwordService;

        public AuthService(IUserRepository userRepository, PasswordService passwordService)
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
        }

        public async Task<AuthResult> LoginAsync(LoginDTO dto)
        {
            var adminExists = await _userRepository.AdminExistsAsync();

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

                await _userRepository.AddUserAsync(admin);
                await _userRepository.SaveChangesAsync();

                return new AuthResult
                {
                    Success = true,
                    Message = "Admin Created Successfully",
                    UserName = admin.UserName,
                    RoleId = 1
                };
            }

            var user = await _userRepository.GetUserByUserNameAsync(dto.UserName);

            if (user == null)
            {
                return new AuthResult
                {
                    Success = false,
                    Message = "Invalid Username"
                };
            }

            var isValid = _passwordService.VerifyPassword(user.PasswordHash, dto.Password);

            if (!isValid)
            {
                return new AuthResult
                {
                    Success = false,
                    Message = "Invalid Password"
                };
            }

            return new AuthResult
            {
                Success = true,
                Message = "Login Successful",
                RoleId = user.RoleId,
                UserName = user.UserName
            };
        }
    }
}
