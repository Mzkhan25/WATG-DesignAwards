using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Common.Request
{
    public class VoteRequest
    {
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public int CategoryId { get; set; }
    }
}
