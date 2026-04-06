using MediLink.Core.Models;

namespace MediLink.Core.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}