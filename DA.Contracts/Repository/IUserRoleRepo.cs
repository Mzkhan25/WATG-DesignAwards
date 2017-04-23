using System.Linq;
using DA.Model;

namespace DA.Contracts.Repository
{
    public interface IUserRoleRepo
    {
        IQueryable<UserRole> GetAll();
        UserRole GetOne(int id);
        bool Save(UserRole item, string userName);
        bool Delete(UserRole item, string userName);
    }
}
