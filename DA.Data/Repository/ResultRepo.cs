using DA.Contracts;
using DA.Contracts.Repository;
using DA.Model;
using System.Linq;

namespace DA.Data.Repository
{
    public class ResultRepo : IResultRepo
    {
        private readonly IDesignAwardsContext _db;
        public ResultRepo()
        {
            _db = new DesignAwardsContext();
        }

        public IQueryable<Result> GetAll()
        {
            return _db.Results;
        }
        
        public Result GetOne(int id)
        {
            return _db.Results.Find(id);
        }
        public bool Save(Result item, string userName)
        {
            var dbItem = _db.Results.ToList().Where(x => x.CategoryId == item.CategoryId)
                .Where(x => x.UserId == item.UserId);

            if (dbItem.Count() > 0)
            {
                return false;
            }
            else
            {
                _db.Results.Add(item);
                _db.SaveChanges();
                return true;
            }
        }
        public bool Delete(Result item, string userName)
        {
            return true;
        }
    }
}