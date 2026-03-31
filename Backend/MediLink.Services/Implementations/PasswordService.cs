using Microsoft.AspNetCore.Identity;

namespace MediLink.Services.Implementations
{
    public class PasswordService
    {
        private readonly PasswordHasher<string> _hasher = new PasswordHasher<string>();

        public string HashPassword(string password)
        {
            return _hasher.HashPassword(null!, password);
        }

        public bool VerifyPassword(string hashedPassword, string enteredPassword)
        {
            var result = _hasher.VerifyHashedPassword(null!, hashedPassword, enteredPassword);
            return result == PasswordVerificationResult.Success;
        }
    }
}
