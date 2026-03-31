using MediLink.Core.Models;
using System.Threading.Tasks;

namespace MediLink.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> AdminExistsAsync();
        Task AddUserAsync(User user);
        Task<User?> GetUserByUserNameAsync(string userName);
        Task SaveChangesAsync();
    }
}
