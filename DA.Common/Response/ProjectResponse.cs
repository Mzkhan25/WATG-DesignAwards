﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Common.Response
{
    public class ProjectResponse
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string ProjectTitle { get; set; }
        public string ProjectOffice { get; set; }
        public string ProjectDescription { get; set; }
        public string PDFPath { get; set; }
        public int Year { get; set; }
        public byte[] DisplayImage { get; set; }
    }
}
