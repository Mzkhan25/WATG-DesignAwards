using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DA.Common.Response;
using DA.Contract;
using System.Web.Http.Cors;

namespace DA.WebApi.Controllers
{
    [RoutePrefix("api/v1/operation")]
    public class OperationController : ApiController
    {
        [Route("GetCategories")]
        [HttpGet]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage GetCategories()
        {
            try
            {
                OperationManager operationManager = new OperationManager();

                return Request.CreateResponse(HttpStatusCode.OK, operationManager.GetAllCategories());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse("Some went wrong");
            }
        }

        [Route("GetProjectByCategory")]
        [HttpGet]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage GetProjectsByCategory(int categoryId)
        {
            try
            {
                OperationManager operationManager = new OperationManager();

                return Request.CreateResponse(HttpStatusCode.OK, operationManager.GetProjectsByCategory(categoryId));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse("Some went wrong");
            }
        }

        [Route("GetProjectById")]
        [HttpGet]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage GetProjectById(int projectId)
        {
            try
            {
                OperationManager operationManager = new OperationManager();

                return operationManager.GetProjectById(projectId);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse("Some went wrong");
            }
        }
    }
}
