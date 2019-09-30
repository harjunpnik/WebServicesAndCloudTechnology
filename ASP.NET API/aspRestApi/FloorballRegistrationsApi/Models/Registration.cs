using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FloorballRegistrationsApi.Models
{
    public class Registration
    {
        public int Id { get; set; }
        public string PlayerId { get; set; }
        public string EventId { get; set; }
    }
}