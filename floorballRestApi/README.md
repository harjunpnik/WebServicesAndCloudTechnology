# WebServicesAndCloudTechnology
# Project 1 - Floorball REST API (Localhosted)

This is a **REST API** made for a floorball hobby team. It's made to make it easier to keep track of players and events. 

The **REST API** can:
* GET player & event information
* GET specific player & event information
* POST player & event information
* Update (PUT) player & event information
* DELETE player & event information

The **API** takes in **Player** data as:
*   **firstName**: String
*   **lastName**: String
*   **email**: String
*   **phone**: String
*   **playerNr**: Number (1-99)
*   **position**: String ("Attacker", "Defender" or "Goalkeeper")


The **API** takes in **event** data as:
*   **type**: String
*   **date**: Date
*   **totalCost**: Number (Defaults to 0)
*   **address**: String
*   **info**: String (can be empty)

## API URLS

On my localhost I'm using PORT=3004 so remember to change the port from the links. The API uses /api/players or /api/events as base routes.

### Players
* GET all Players [http://localhost:3004/api/players](http://localhost:3004/api/players)
* GET specific Player with ID [http://localhost:3004/api/players/5d776b2b014b703518d0aabc](http://localhost:3004/api/players/5d776b2b014b703518d0aabc)
* POST new Player [http://localhost:3004/api/players](http://localhost:3004/api/players)
* PUT (update) new info to old Player (needs ID) [http://localhost:3004/api/players/5d776b2b014b703518d0aabc](http://localhost:3004/api/players/5d776b2b014b703518d0aabc)
* DELETE a Player with ID [http://localhost:3004/api/players/5d776b2b014b703518d0aabc](http://localhost:3004/api/players/5d776b2b014b703518d0aabc)

### Events
* GET all Events [http://localhost:3004/api/events](http://localhost:3004/api/events)
* GET specific Event with ID [http://localhost:3004/api/events/5d769a2107c2910f003b529a](http://localhost:3004/api/events/5d769a2107c2910f003b529a)
* POST new Event [http://localhost:3004/api/events](http://localhost:3004/api/events)
* PUT (update) new info to old Event (needs ID) [http://localhost:3004/api/events/5d769a2107c2910f003b529a](http://localhost:3004/api/events/5d769a2107c2910f003b529a)
* DELETE a Event with ID [http://localhost:3004/api/events/5d769a2107c2910f003b529a](http://localhost:3004/api/events/5d769a2107c2910f003b529a)



