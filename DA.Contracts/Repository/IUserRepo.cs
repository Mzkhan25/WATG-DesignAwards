
using System.Linq;
using DA.Model;

namespace DA.Contracts.Repository
{
    public interface IUserRepo
    {
        IQueryable<User> GetAll();
        User GetOne(int id);
        bool Save(User item, string userName);
        bool Delete(User item, string userName);
        User GetOneByPin(string pin);
    }
}
