using MediLink.Core.DTOs;
using System.Threading.Tasks;

namespace MediLink.Core.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResult> LoginAsync(LoginDTO loginDto);
    }
}
