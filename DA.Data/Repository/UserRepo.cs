using DA.Contracts;
using DA.Contracts.Repository;
using DA.Model;
using System.Linq;

namespace DA.Data.Repository
{
    public class UserRepo : IUserRepo
    {
        // Methods which aren't implemented were not requried for now, they will be implemented soon
        private readonly IDesignAwardsContext _db;
        public UserRepo()
        {
            _db = new DesignAwardsContext();
        }
        public IQueryable<User> GetAll()
        {
            return _db.Users;
        }
        public User GetOne(int id)
        {
            return _db.Users.Find(id);
        }
        public User GetOneByPin(string pin)
        {
            return _db.Users.Where(x => x.PIN == pin).SingleOrDefault();
        }
        public bool Save(User item, string userName)
        {
            return true;
        }
        public bool Delete(User item, string userName)
        {
            return true;
        }
    }
}