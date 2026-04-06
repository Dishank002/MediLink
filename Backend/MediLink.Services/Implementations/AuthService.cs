using MediLink.Core.DTOs;
using MediLink.Core.Interfaces;
using MediLink.Core.Models;
using System;
using System.Threading.Tasks;
using System.Diagnostics;

namespace MediLink.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly PasswordService _passwordService;
        private readonly IJwtService _jwtService;

        public AuthService(IUserRepository userRepository, PasswordService passwordService, IJwtService jwtService)
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
            _jwtService = jwtService;
        }

        public async Task<AuthResult> LoginAsync(LoginDTO dto)
        {
            var sw = Stopwatch.StartNew();
            var adminExists = await _userRepository.AdminExistsAsync();
            Console.WriteLine($"AdminExists check: {sw.ElapsedMilliseconds} ms");
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
                Console.WriteLine($"Add user: {sw.ElapsedMilliseconds} ms");
                await _userRepository.SaveChangesAsync();
                Console.WriteLine($"Save changes: {sw.ElapsedMilliseconds} ms");
                sw.Stop();
                Console.WriteLine($"Total (admin creation): {sw.ElapsedMilliseconds} ms");

                return new AuthResult
                {
                    Success = true,
                    Message = "Admin Created Successfully",
                    UserName = admin.UserName,
                    RoleId = 1
                };
            }

            var user = await _userRepository.GetUserByUserNameAsync(dto.UserName);
            Console.WriteLine($"Get user: {sw.ElapsedMilliseconds} ms");


            if (user == null)
            {
                sw.Stop();
                Console.WriteLine($"Total (invalid user): {sw.ElapsedMilliseconds} ms");
                return new AuthResult
                {
                    Success = false,
                    Message = "Invalid Username"
                };
            }

            var isValid = _passwordService.VerifyPassword(user.PasswordHash, dto.Password);
            
            Console.WriteLine($"Password verify: {sw.ElapsedMilliseconds} ms");

            sw.Stop();
                Console.WriteLine($"Total login: {sw.ElapsedMilliseconds} ms");
            if (!isValid)
            {
                return new AuthResult
                {
                    Success = false,
                    Message = "Invalid Password"
                };
            }
            
            var token = _jwtService.GenerateToken(user);
            return new AuthResult
            {
                Success = true,
                Message = "Login Successful",
                Token = token,
                RoleId = user.RoleId,
                UserName = user.UserName
            };
        }
    }
}
