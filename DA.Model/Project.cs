using DA.Model.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace DA.Model
{
    public class Project : BaseModel
    {
        public string ProjectTitle { get; set; }
        public string ProjectOffice { get; set; }
        public string ProjectDescription { get; set; }
        public string PDFPath { get; set; }
        public int Year { get; set; }
        public byte[] DisplayImage { get; set; }

        // foreign key for Category
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
    }
}