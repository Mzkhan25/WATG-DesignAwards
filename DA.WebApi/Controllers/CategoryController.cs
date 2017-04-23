using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DA.Common.Request;
using System.Web.Http.Cors;
using DA.Contracts.Repository;
using DA.Data.Repository;
using DA.Model;
using AutoMapper;
using DA.Common.Response;
using System.Collections.Generic;
using System.Linq;

namespace DA.WebApi.Controllers
{
    [RoutePrefix("api/v1/operation")]
    public class CategoryController : ApiController
    {
        private readonly ICategoryRepo _categoryRepo;
        public CategoryController()
        {
            _categoryRepo = new CategoryRepo();
        }
        
        [Route("GetCategories")]
        [HttpGet]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage GetCategories()
        {
            try
            {
                List<CategoryResponse> categoryResponse = new List<CategoryResponse>();

                IQueryable<Category> catgoriesList = _categoryRepo.GetAll();

                Mapper.Initialize(c =>
                {
                    c.CreateMap<Category, CategoryResponse>();
                });
                categoryResponse = Mapper.Map<IQueryable<Category>, List<CategoryResponse>>
                    (catgoriesList);
                return Request.CreateResponse(HttpStatusCode.OK, categoryResponse);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse("Some went wrong");
            }
        }

        //[Route("GetProjectByCategory")]
        //[HttpGet]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        //public HttpResponseMessage GetProjectsByCategory(int categoryId)
        //{
        //    try
        //    {
        //        OperationManager operationManager = new OperationManager();

        //        return Request.CreateResponse(HttpStatusCode.OK, operationManager.GetProjectsByCategory(categoryId));
        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateResponse("Some went wrong");
        //    }
        //}
    }
}
