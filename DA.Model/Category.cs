using DA.Model.Common;

namespace DA.Model
{
    public class Category : BaseModel
    {
        public string CategoryName { get; set; }
        public byte[] Image { get; set; }
    }
}