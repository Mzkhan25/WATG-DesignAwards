using DA.Common.Response;
using DA.Contracts;
using DA.Contracts.Repository;
using DA.Model;
using System.Collections.Generic;
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

        public List<ResultResponse> GetAll()
        {
            // ----------- To-Do: refactor it to use LINQ
            using (var ctx = new DesignAwardsContext())
            {

                var allResults = ctx.Database.SqlQuery<ResultResponse>("Select c.CategoryName,p.ProjectTitle,COUNT(r.UserId) as VoteCount " +
                                                                        "from Projects P " +
                                                                        "Left JOIN[Results] as R ON p.Id = r.ProjectId " +
                                                                        "Left JOIN Categories c on c.Id = p.CategoryId " +
                                                                        "GROUP BY P.ProjectTitle, c.CategoryName").ToList();
                return allResults;
           }
            
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

        public bool AlreadyVotedCheck(int categoryId, int userId)
        {
            var dbItem = _db.Results.ToList().Where(x => x.CategoryId == categoryId)
                .Where(x => x.UserId == userId);

            if (dbItem.Count() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public bool Delete(Result item, string userName)
        {
            return true;
        }
    }
}