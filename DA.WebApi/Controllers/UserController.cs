using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DA.Common;
using DA.Common.Response;
using DA.Common.Request;

namespace DA.WebApi.Controllers
{
    [RoutePrefix("api/v1/User")]
    public class UserController : ApiController
    {
        [Route("Login")]
        [HttpPost]
        public LoginResponse Login(LoginRequest request)
        {
            LoginResponse loginResponse = new LoginResponse();

            return loginResponse;
        }
    }
}
