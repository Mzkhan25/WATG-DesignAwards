using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WATG_DesignAwardsPortal.Contracts.IRepository;
using WATG_DesignAwardsPortal.Data.Repository;
using WATG_DesignAwardsPortal.Model.Classes;

namespace WATG_DesignAwardsPortal.Web.Server.Controllers
{
    public class ProjectController : Controller
    {
        private readonly IProjectRepository _project = new ProjectRepository();
        // GET: Project
        public ActionResult GetAll()
        {
            var result = _project.GetAll().ToList();
            var jsonResult = new JsonResult
            {
                Data = result,
                MaxJsonLength = int.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return jsonResult;
        }
        public ActionResult GetByCategory(int id)
        {
            var result = _project.GetAll().Where(p=> p.CategoryId==id).ToList();
            var jsonResult = new JsonResult
            {
                Data = result,
                MaxJsonLength = int.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return jsonResult;
        }
        public ActionResult GetById(int id)
        {
            var result = _project.GetAll().Where(p => p.Id == id).ToList();
            var jsonResult = new JsonResult
            {
                Data = result,
                MaxJsonLength = int.MaxValue,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return jsonResult;
        }

        public ActionResult GetProjectName(int id)
        {
            var result = _project.GetAll().Where(p => p.Id == id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [ValidateInput(false)]
        public ActionResult Save(Project project, HttpPostedFileBase image, HttpPostedFileBase document)
        {
            if (document != null)
            {
                try
                {

                    string directoryRelativePath = "/watgDesignAwards/Attachments/";
                    var fileName = document.FileName.Split('.')[0] + DateTime.UtcNow.Ticks;
                    project.PdfPath = directoryRelativePath + fileName + document.FileName.Substring(document.FileName.LastIndexOf("."));
                    string attachmentPhysicalPath = Server.MapPath(project.PdfPath);
                        document.SaveAs(attachmentPhysicalPath);

                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }

            var result = _project.Save(project, image,document,"");
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}