﻿
using System.Linq;
using System.Web.Configuration;
using System.Web.Mvc;
using WATG_DesignAwardsPortal.Contracts.IRepository;
using WATG_DesignAwardsPortal.Data.Repository;
using WATG_DesignAwardsPortal.Model.Classes;
using WATG_DesignAwardsPortal.Model.Common;

namespace WATG_DesignAwardsPortal.Web.Server.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserRepository _user = new UserRepository();
        // GET: User
        public ActionResult GetAll()
        {
            var result = _user.GetAll().ToList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult Login(string password)
        {
            var result = _user.GetAll().ToList().FirstOrDefault(p => p.Password== password);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Save(User user)
        {
            var result = _user.Save(user, "");
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Delete(int id)
        {
            var result = _user.Delete(id,"");
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}