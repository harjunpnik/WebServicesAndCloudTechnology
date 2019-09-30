using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FloorballRegistrationsApi.Models
{
    public class RegistrationInfo
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EventName { get; set; }
        public string EventDate { get; set; }
    }
}