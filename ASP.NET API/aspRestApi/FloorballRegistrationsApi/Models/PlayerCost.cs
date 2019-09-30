using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FloorballRegistrationsApi.Models
{
    public class PlayerCost
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public double TotalCost { get; set; }
    }
}