using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Common.Response
{
    public class CategoryResponse
    {
        public int  Id { get; set; }
        public string CategoryName { get; set; }
        public byte[] Image { get; set; }
    }
}
