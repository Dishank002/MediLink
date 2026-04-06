using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace MediLink.Services.Implementations
{
    public class PasswordService
    {
        public PasswordService()
        {
            var options = Options.Create(new PasswordHasherOptions
            {
                IterationCount = 100
            });
            _hasher = new PasswordHasher<string>(options);
        }
        
        private readonly PasswordHasher<string> _hasher;

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
