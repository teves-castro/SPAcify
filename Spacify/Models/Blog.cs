﻿
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Spacify.Models
{
    public class Blog : EntityBase
    {
        public Guid Id { get; set; }
        [StringLength(256)]
        public string Name { get; set; }
    }
}// Generated helper templates
// Generated items
// Spacify\Spacify\Models\Blog.cs.pp

