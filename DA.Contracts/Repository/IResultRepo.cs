
using System.Linq;
using DA.Model;
using DA.Common.Response;
using System.Collections.Generic;

namespace DA.Contracts.Repository
{
    public interface IResultRepo
    {
        List<ResultResponse> GetAll();
        Result GetOne(int id);
        bool Save(Result item, string userName);
        bool Delete(Result item, string userName);
    }
}
