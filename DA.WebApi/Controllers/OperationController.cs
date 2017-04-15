using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DA.Common.Response;
using DA.Contract;

namespace DA.WebApi.Controllers
{
    [RoutePrefix("api/v1/operation")]
    public class OperationController : ApiController
    {
        [Route("GetCategories")]
        [HttpGet]
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
    }
}
