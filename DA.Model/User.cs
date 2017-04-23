using DA.Model.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DA.Model
{
    public class User : BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PIN { get; set; }
        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public UserRole UserRole { get; set; }
    }
}