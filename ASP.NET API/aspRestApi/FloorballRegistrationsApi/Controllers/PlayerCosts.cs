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
    public class PlayerCosts : ControllerBase
    { 
        // GET: api/registrationInfo
        [HttpGet]
        public async Task<List<PlayerCost>> Get()
        {
            FloorballDb db = new FloorballDb();
            List<PlayerCost> playerCosts = await db.GetPlayerCosts();
            
            return playerCosts;
        }
    }
    
}
