using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace $rootnamespace$.Models
{
    public class Blog : EntityBase
    {
        public Guid Id { get; set; }
        [StringLength(256)]
        public string Name { get; set; }
    }
}