using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FloorballRegistrationsApi.Models;
using FloorballRegistrationsApi.Resources;

namespace FloorballRegistrationsApi.Controllers
{

    [Route("/api/[controller]")]
    public class Registrations : ControllerBase
    {        
        // GET: api/<controller>
        [HttpGet]
        public List<Registration> Get()
        {
            FloorballDb db = new FloorballDb();
            return db.GetRegistrations();
        }
        
        // POST api/<controller>
        [HttpPost]
        public string Post([FromBody] Registration r)
        {
            FloorballDb db = new FloorballDb();
            string status = db.SaveRegistration(r);
            return status;
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public string Put(int id, [FromBody] Registration r)
        {
            FloorballDb db = new FloorballDb();
            string status = db.UpdateRegistration(id, r);
            return status;
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            FloorballDb db = new FloorballDb();
            string status = db.DeleteRegistration(id);
            return status;
        }

    }

    [Route("/api/registrationInfo")]
    public class RegistrationsInfo : ControllerBase
    { 
        // GET: api/registrationInfo
        [HttpGet]
        public async Task<List<RegistrationInfo>> Get()
        {
            FloorballDb db = new FloorballDb();
            List<RegistrationInfo> registrations = await db.GetRegistrationInfos();
            
            return registrations;
        }
    }
}
