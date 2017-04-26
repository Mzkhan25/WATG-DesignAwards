using DA.Model.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace DA.Model
{
    public class Result : BaseModel
    {
        public int ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
        
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int CategoryId { get; set; }
       
    }
}