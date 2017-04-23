#region
using System;
using System.ComponentModel.DataAnnotations;

#endregion

namespace DA.Model.Common
{
    public abstract class BaseModel
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateModified { get; set; }
        public string AddedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}