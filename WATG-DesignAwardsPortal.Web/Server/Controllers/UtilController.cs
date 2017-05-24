using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.AccessControl;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;

namespace WATG_DesignAwardsPortal.Web.Server.Controllers
{
    public class UtilController : Controller
    {
        // GET: Util
        public bool MakeNecessarryFolders()
        {
            bool result = true;
            try
            {
               string[] folderpaths = {  "/watgdesignawards/Attachments/" };
               // string[] folderpaths = { "/Attachments/" };
                foreach (string folderpath in folderpaths)
                {
                    string folderPhysicalPath = Server.MapPath(folderpath);
                    bool exists = System.IO.Directory.Exists(folderPhysicalPath);

                    if (!exists)
                    {
                        DirectoryInfo di = System.IO.Directory.CreateDirectory(folderPhysicalPath);
                        DirectoryInfo dInfo = new DirectoryInfo(folderPhysicalPath);
                        DirectorySecurity dSecurity = dInfo.GetAccessControl();
                        dSecurity.AddAccessRule(
                            new FileSystemAccessRule(new SecurityIdentifier(WellKnownSidType.WorldSid, null),
                                FileSystemRights.FullControl,
                                InheritanceFlags.ObjectInherit | InheritanceFlags.ContainerInherit,
                                PropagationFlags.NoPropagateInherit, AccessControlType.Allow));
                        dInfo.SetAccessControl(dSecurity);
                    }
                }
            }
            catch (Exception exception)
            {
                result = false;
            }
            return result;
        }
    }
}