# WebServicesAndCloudTechnology

Web services and Cloud Technology course work. 

## Learning points of course
* Development of REST APIs
  * Both in Node.js and ASP.NET
* How to apply the HTTP protocol between REST clients and REST Services aswell as between REST services on different platforms
* Learned to setup and utilize Azure cloud services and MongoDB Atlas
  * Deployment of databases, web services and web applications

I now am more familiar with cloud services and their possibilities in software development.

## Project 1 - Floorball REST API NODE.js (Uploaded to Azure (Can also be localhosted))

This is a REST API written in NODE.js and with a MongoDB. This REST API is made for a floorball hobby team. It's made to make it easier to keep track of players and events. 

The REST API can:
* GET player & event information
* GET specific player & event information
* POST player & event information
* Update (PUT) player & event information
* DELETE player & event information

## Project 2 - Floorball REST API ASP.NET(Uploaded to Azure (Can also be localhosted))

This is a REST API written in ASP.NET. This REST API is a continuation of the previous project. This API contains a relational database (SQL Database). It fetches data from the previous API based on the id of the event or player. This API is made to make tracking registrations of players to events easier. This project also includes a frontend application.

The REST API can:
* GET Registrations (only player id and event id)
* POST Registrations (only player id and event id)
* Update (PUT) registrations (with id)(only player id and event id)
* Delete registration (with id)
* GET Registration info (player name, event name, event type)
* GET Total player costs  (player name, total cost based on events participated)

