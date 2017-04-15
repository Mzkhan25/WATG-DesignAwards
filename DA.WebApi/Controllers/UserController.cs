using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DA.Common;
using DA.Common.Response;
using DA.Common.Request;
using DA.Contract;


namespace DA.WebApi.Controllers
{
    [RoutePrefix("api/v1/User")]
    public class UserController : ApiController
    {
        [Route("Login")]
        [HttpPost]
        public HttpResponseMessage Login(LoginRequest request)
        {
            try
            {
                UserManager userManager = new UserManager();
                
                return Request.CreateResponse(HttpStatusCode.OK, userManager.LoginUser(request));
            }
            catch(Exception ex)
            {
                return Request.CreateResponse("Some went wrong");
            }
        }
    }
}
