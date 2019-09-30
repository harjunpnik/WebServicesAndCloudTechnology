# WebServicesAndCloudTechnology
## Project 2 - Floorball REST API (Uploaded to Azure (Can also be localhosted))

This is a **REST API** written in **ASP.NET**. This REST API is a continuation of the previous project. This API contains a relational database (SQL Database). It fetches data from the previous API based on the id of the event or player. This API is made to make tracking registrations of players to events easier. This project also includes a frontend application.

The REST API can:
* GET Registrations (only player id and event id)
* POST Registrations (only player id and event id)
* Update (PUT) registrations (with id) (only player id and event id)
* Delete registration (with id)
* GET Registration info (player name, event name, event type)
* GET Total player costs  (player name, total cost based on events participated)

The **API** takes in **registration** data as:
*   **playerId**: String
*   **eventId**: String

The **API** returns in **registrationInfo** data as:
*   **firstName**: String
*   **lastName**: String
*   **eventName**: String
*   **eventDate**: Date


## API URLS

On my localhost I'm using PORT=5001 so remember to change the port from the links. 

### registration
* GET all registrations[https://localhost:5001/api/registrations](https://localhost:5001/api/registrations)
* POST new registration[https://localhost:5001/api/registrations](https://localhost:5001/api/registrations)
* PUT (update) new info to old registration(needs ID) [https://localhost:5001/api/registrations/5](https://localhost:5001/api/registrations/5)
* DELETE a registration with ID [https://localhost:5001/api/registrations/5](https://localhost:5001/api/registrations/5)

### registrationinfo
* GET all registrationinfos[https://localhost:5001/api/registrationinfo](https://localhost:5001/api/registrationinfo)

### playercosts
* GET all playercosts[https://localhost:5001/api/playercosts](https://localhost:5001/api/playercosts)


