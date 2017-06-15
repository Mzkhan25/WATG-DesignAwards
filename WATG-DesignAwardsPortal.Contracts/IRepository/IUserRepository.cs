using System.Linq;
using WATG_DesignAwardsPortal.Model.Classes;

namespace WATG_DesignAwardsPortal.Contracts.IRepository
{
    public interface IUserRepository
    {
        IQueryable<User> GetAll();
        bool Save(User item, string userName);
        bool Delete(int id, string userName);
    }
}