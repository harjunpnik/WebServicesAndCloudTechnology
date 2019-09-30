using FloorballRegistrationsApi.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FloorballRegistrationsApi.Resources
{
    public class FloorballDb
    {

        private SqlConnection sqlConn;

        public bool OpenConnection()
        {
            sqlConn = new SqlConnection("{yourDBConnectionString}");

            try
            {
                sqlConn.Open();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        //  GET ALL REGISTRATIONS (returns a list)
        public List<Registration> GetRegistrations()
        {
            List<Registration> registrations = new List<Registration>();

            if (OpenConnection() == true)
            {
                SqlCommand query = new SqlCommand("SELECT * FROM Registrations;", sqlConn);

                try
                {
                    SqlDataReader reader = query.ExecuteReader();
                    //  Reads line for line
                    while(reader.Read())
                    {
                        //  Convertsd to right object and adds to list
                        Registration r = new Registration();
                        r.Id = reader.GetInt32(0);
                        r.PlayerId = reader.GetString(1);
                        r.EventId = reader.GetString(2);

                        registrations.Add(r);
                    }
                }
                catch(Exception e)
                {
                    System.Diagnostics.Debug.WriteLine("Error selecting all registrations: " + e.Message); 
                }
            }

            return registrations;
        }

        //  SAVES A REGISTRATION (returns a message)
        public string SaveRegistration(Registration r)
        {
            if (OpenConnection() == true)
            {
                //  Query for saving a new registrations
                SqlCommand query = new SqlCommand("INSERT INTO Registrations (PlayerId, EventId) VALUES('" + r.PlayerId + "', '" + r.EventId + "');", sqlConn);

                try
                {
                    query.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    //  IF query fails, return error message to client
                    System.Diagnostics.Debug.WriteLine("Error when executing SQL-query: " + e.Message);
                    return "Error when executing SQL-query:  " + e.Message;
                }

                sqlConn.Close();
                return "Registration successfully saved!";
            }
            else
            {
                return "Could not open connection to the SQL-server";
            }
        }

        //  UPDATES A REGISTRATION (returns a message)
        public string UpdateRegistration(int id, Registration r)
        {
            if (OpenConnection() == true)
            {
                //  Query for replacing a registration by id
                SqlCommand query = new SqlCommand("UPDATE Registrations SET PlayerId = '" + r.PlayerId +  "', EventId = '" + r.EventId + "' WHERE Id = " + id + ";", sqlConn);

                try
                {
                    query.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    //  IF query fails, return error message to client
                    System.Diagnostics.Debug.WriteLine("Error when executing SQL-query: " + e.Message);
                    return "Error when executing SQL-query:  " + e.Message;
                }

                sqlConn.Close();
                return "Registration successfully updated!";
            }
            else
            {
                return "Could not open connection to the SQL-server";
            }

        }
        //  DELETE A REGISTRATION (returns a message)
        public string DeleteRegistration(int id)
        {
            if (OpenConnection() == true)
            {
                //  Query for deleting a registration by id
                SqlCommand query = new SqlCommand("DELETE FROM Registrations WHERE Id = " + id + ";", sqlConn);

                try
                {
                    query.ExecuteNonQuery();
                }
                catch (Exception e)
                {   
                    //  IF query fails, return error message to client
                    System.Diagnostics.Debug.WriteLine("Error when executing SQL-query: " + e.Message);
                    return "Error when executing SQL-query:  " + e.Message;
                }

                sqlConn.Close();
                return "Registration successfully deleted!";
            }
            else
            {
                return "Could not open connection to the SQL-server";
            }
        }            



        //  GETS REGISTRATION INFO WITH USER DATA (returns a list)
        public async Task<List<RegistrationInfo>> GetRegistrationInfos()
        {
           List<RegistrationInfo> registrations = new List<RegistrationInfo>();

            if (OpenConnection() == true)
            {
                //  Query for getting all registrations
                SqlCommand query = new SqlCommand("SELECT * FROM Registrations;", sqlConn);

                try
                {
                    SqlDataReader reader = query.ExecuteReader();
                    HttpClient client = new HttpClient();
                    
                    //  Preload all players and events
                    string playerApi = "https://floorballrestapi.azurewebsites.net/api/players/";
                    string eventApi = "https://floorballrestapi.azurewebsites.net/api/events/";
                    HttpResponseMessage playerResponse = await client.GetAsync(playerApi);   
                    HttpResponseMessage eventResponse = await client.GetAsync(eventApi);   
                    string playerResponseString = Convert.ToString(playerResponse.Content.ReadAsStringAsync().Result);
                    string eventResponseString = Convert.ToString(eventResponse.Content.ReadAsStringAsync().Result);
                    
                    //  Convert Players and Events to Json Arrays
                    JArray playerJson = JArray.Parse(playerResponseString);
                    JArray eventJson = JArray.Parse(eventResponseString);
                    
                    //  Reads line for line
                    while(reader.Read())
                    {
                        //  Uses Json Path query to find player and saves player as a Json token
                        JToken playerToken = playerJson.SelectToken("$.[?(@.id== '" +  reader.GetString(1) + "')]");
                        //Console.WriteLine(playerToken);

                        //  Uses Json Path query to find Event and saves Event as a Json token
                        JToken eventToken = eventJson.SelectToken("$.[?(@.id== '" +  reader.GetString(2) + "')]");
                        //Console.WriteLine(eventToken);
                        
                        //  Converts to right object and adds to list
                        RegistrationInfo r = new RegistrationInfo();
                        r.Id = reader.GetInt32(0);
                        r.FirstName = (string)playerToken["firstName"];
                        r.LastName = (string)playerToken["lastName"];
                        r.EventName = (string)eventToken["type"] + ": " +  (string)eventToken["info"];
                        r.EventDate =  (string)eventToken["date"];

                        registrations.Add(r);
                    }
                }
                catch(Exception e)
                {
                    System.Diagnostics.Debug.WriteLine("Error selecting all registrations: " + e.Message); 
                }
            }

            return registrations;
        }

        public async Task<List<PlayerCost>> GetPlayerCosts()
        {
           List<PlayerCost> playerCosts = new List<PlayerCost>();

                try
                {
                    HttpClient client = new HttpClient();

                    //  Preload registrations and convert to Json Array
                    List<Registration> registrations = GetRegistrations();
                    JArray registrationJson = new JArray(
                        registrations.Select(p => new JObject
                        {
                            { "id", p.Id },
                            { "playerId", p.PlayerId },
                            { "eventId", p.EventId }
                        })
                    );
                    
                    //  Preload all players and events
                    string playerApi = "https://floorballrestapi.azurewebsites.net/api/players/";
                    string eventApi = "https://floorballrestapi.azurewebsites.net/api/events/";
                    HttpResponseMessage playerResponse = await client.GetAsync(playerApi);   
                    HttpResponseMessage eventResponse = await client.GetAsync(eventApi);  
                    string playerResponseString = Convert.ToString(playerResponse.Content.ReadAsStringAsync().Result);
                    string eventResponseString = Convert.ToString(eventResponse.Content.ReadAsStringAsync().Result);                    
                    
                    //  Convert Players and Events to Json Arrays
                    JArray playerJson = JArray.Parse(playerResponseString);
                    JArray eventJson = JArray.Parse(eventResponseString);

                    //  Reads line for line
                    foreach(JObject player in playerJson){

                        //  Converts to right object and adds to list
                        PlayerCost p = new PlayerCost();
                        p.FirstName = (string)player["firstName"];
                        p.LastName = (string)player["lastName"];
                        //  Sets default value of total cost to 0 per user
                        double totalCost = 0;
                        //  Get from registrations a list with all registrations a certain user is participating in
                        IEnumerable<JToken> playerToken = registrationJson.SelectTokens("$.[?(@.playerId== '" + (string)player["id"] + "')]");
                        //  Loop all registrations to add totalCost
                        foreach (JToken item in playerToken)
                        {
                            //Console.WriteLine(item["eventId"]);

                            //  Search from registrations all registrations that are to a certain event
                            IEnumerable<JToken> totalEventAttendees = registrationJson.SelectTokens("$.[?(@.eventId== '" + (string)item["eventId"] + "')]");
                            //  Search with eventId the event cost
                            double eventCost = (double)eventJson.SelectToken("$.[?(@.id== '" +  (string)item["eventId"] + "')].totalCost");
                            //Console.WriteLine(eventCost);
                            //Console.WriteLine(totalEventAttendees.Count());
                            //  cost per person is the event cost divided by the attendees amount
                            double costPerPerson = eventCost/totalEventAttendees.Count();
                            //Console.WriteLine(costPerPerson);
                            totalCost += costPerPerson;
                            
                        }

                        p.TotalCost = totalCost;
                        playerCosts.Add(p);     
                    }

                }
                catch(Exception e)
                {
                    System.Diagnostics.Debug.WriteLine("Error selecting all registrations: " + e.Message); 
                }
            

            return playerCosts;
        }


        //  THIS IS NOT IN USE, THIS WILL CALL THE NODEJS API FOR EACH INDIVIDUAL PLAYER AND EVENT
        //  MIGHT BE USEFUL WHEN DATABASE IS TOO BIG TO PRELOAD
        public async Task<List<RegistrationInfo>> GetRegistrationInfosVersion2()
        {
           List<RegistrationInfo> registrations = new List<RegistrationInfo>();

            if (OpenConnection() == true)
            {
                SqlCommand query = new SqlCommand("SELECT * FROM Registrations;", sqlConn);

                try
                {
                    SqlDataReader reader = query.ExecuteReader();
                    HttpClient client = new HttpClient();
                    string playerApi = "https://floorballrestapi.azurewebsites.net/api/players/";
                    string eventApi = "https://floorballrestapi.azurewebsites.net/api/events/";
                    //läser rad för rad
                    while(reader.Read())
                    {
                        HttpResponseMessage playerResponse = await client.GetAsync(playerApi + reader.GetString(1));   
                        HttpResponseMessage eventResponse = await client.GetAsync(eventApi + reader.GetString(2));   

                        string playerResponseString = Convert.ToString(playerResponse.Content.ReadAsStringAsync().Result);
                        string eventResponseString = Convert.ToString(eventResponse.Content.ReadAsStringAsync().Result);
                        
                        JObject playerJson = JObject.Parse(playerResponseString);
                        JObject eventJson = JObject.Parse(eventResponseString);

                        RegistrationInfo r = new RegistrationInfo();
                        r.Id = reader.GetInt32(0);
                        r.FirstName = (string)playerJson["firstName"];
                        r.LastName = (string)playerJson["lastName"];
                        r.EventName = (string)eventJson["type"] + ": " +  (string)eventJson["info"];
                        r.EventDate =  (string)eventJson["date"];

                        registrations.Add(r);
                    }
                }
                catch(Exception e)
                {
                    System.Diagnostics.Debug.WriteLine("Error selecting all registrations: " + e.Message); 
                }
            }

            return registrations;
        }

    }
}
