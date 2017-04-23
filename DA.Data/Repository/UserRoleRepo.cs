using DA.Contracts;
using DA.Contracts.Repository;
using DA.Model;
using System.Linq;

namespace DA.Data.Repository
{
    public class UserRoleRepo : IUserRoleRepo
    {
        // Methods which aren't implemented were not requried for now, they will be implemented soon
        private readonly IDesignAwardsContext _db;
        public UserRoleRepo()
        {
            _db = new DesignAwardsContext();
        }
        public IQueryable<UserRole> GetAll()
        {
            return null;
        }
        public UserRole GetOne(int id)
        {
            return _db.UserRoles.Find(id);
        }
        public bool Save(UserRole item, string userName)
        {
            return true;
        }
        public bool Delete(UserRole item, string userName)
        {
            return true;
        }
    }
}