
using System.Linq;
using DA.Model;
namespace DA.Contracts.Repository
{
    public interface IResultRepo
    {
        IQueryable<Result> GetAll();
        Result GetOne(int id);
        bool Save(Result item, string userName);
        bool Delete(Result item, string userName);
    }
}
