  
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Player = require('../models/player')

const initialPlayers = [
    {
        _id: "5d769722bd43bf3b4c32f1fd",
        firstName: "Tommi",
        lastName: "TestMan",
        email: "test@mail.com",
        phone: "123-456789",
        playerNr: 7,
        position: "Attacker",
        __v: 0
    },
    {
        _id: "5d7697b0bd43bf3b4c32f1fe",
        firstName: "Andre",
        lastName: "Ruotsalainen",
        email: "andredr@email.fi",
        phone: "234-987651",
        playerNr: 12,
        position: "Defender",
        __v: 0
    },
    {
        _id: "5d778b665fe0063450e97f37",
        firstName: "Andre",
        lastName: "Rantanen",
        email: "random@email.com",
        phone: "234-987651",
        playerNr: 22,
        position: "Goalkeeper",
        __v: 0
    },
    {
        _id: "5d778b6f5fe0063450e97f38",
        firstName: "Antonio",
        lastName: "Ruotsalainen",
        email: "henlo@gmal.com",
        phone: "234-987651",
        playerNr: 22,
        position: "Attacker",
        __v: 0
    }
]

beforeEach(async () => {
    await Player.deleteMany({})
  
    let playerObject = new Player(initialPlayers[0])
    await playerObject.save()
  
    playerObject = new Player(initialPlayers[1])
    await playerObject.save()
    playerObject = new Player(initialPlayers[2])
    await playerObject.save()
    playerObject = new Player(initialPlayers[3])
    await playerObject.save()
})

describe('Players are returned properly', () => {

    test('Are returned as json', async () => {
        await api
          .get('/api/players')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
    
      test('There is 4 players', async () => {
        const response = await api.get('/api/players')
        expect(response.body.length).toBe(4)
      })
    
      test('There is an id property', async () => {
          const response = await api.get('/api/players')
          expect(response.body[0].id).toBeDefined()
      })
})

describe('A valid Player can be added', () => {

    test('If all data is correct', async () => {
        const newPlayer = {
            firstName: "Teemu",
            lastName: "Mansson",
            email: "manssons@mail.com",
            phone: "123-4553412",
            playerNr: 98,
            position: "Attacker"
        }  
      
        await api
          .post('/api/players')
          .send(newPlayer)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/players')
      
        const playerNr = response.body.map(r => r.playerNr)
      
        expect(response.body.length).toBe(initialPlayers.length + 1)
        expect(playerNr).toContain(98)
    })

})

describe('A Player wont be added', () => {

    test('If first name is missing', async () => {
        const newPlayer = {
            lastName: "Mansson",
            email: "manssons@mail.com",
            phone: "123-4553412",
            playerNr: 98,
            position: "Attacker"
        }  
      
        await api
        .post('/api/players')
        .send(newPlayer)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('If last name is missing', async () => {
        const newPlayer = {
            firstName: "Teemu",
            email: "manssons@mail.com",
            phone: "123-4553412",
            playerNr: 98,
            position: "Attacker"
        }  
      
        await api
        .post('/api/players')
        .send(newPlayer)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('If email is missing', async () => {
        const newPlayer = {
            firstName: "Teemu",
            lastName: "Mansson",
            phone: "123-4553412",
            playerNr: 98,
            position: "Attacker"
        }  
      
        await api
        .post('/api/players')
        .send(newPlayer)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('If phone number is missing', async () => {
        const newPlayer = {
            firstName: "Teemu",
            lastName: "Mansson",
            email: "manssons@mail.com",
            playerNr: 98,
            position: "Attacker"
        }  
      
        await api
        .post('/api/players')
        .send(newPlayer)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('If player number is missing', async () => {
        const newPlayer = {
            firstName: "Teemu",
            lastName: "Mansson",
            email: "manssons@mail.com",
            phone: "123-4553412",
            position: "Attacker"
        }  
      
        await api
        .post('/api/players')
        .send(newPlayer)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('If position is missing', async () => {
        const newPlayer = {
            firstName: "Teemu",
            lastName: "Mansson",
            email: "manssons@mail.com",
            phone: "123-4553412",
            playerNr: 98
        }  
      
        await api
        .post('/api/players')
        .send(newPlayer)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('If player number is negative', async () => {
        const newPlayer = {
            firstName: "Teemu",
            lastName: "Mansson",
            email: "manssons@mail.com",
            phone: "123-4553412",
            playerNr: -98,
            position: "Attacker",
        }  
      
        await api
        .post('/api/players')
        .send(newPlayer)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('If position is not Attacker, Defender or Goalkeeper', async () => {
        const newPlayer = {
            firstName: "Teemu",
            lastName: "Mansson",
            email: "manssons@mail.com",
            phone: "123-4553412",
            playerNr: 98,
            position: "Center",
        }  
      
        await api
        .post('/api/players')
        .send(newPlayer)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

})


afterAll(() => {
    mongoose.connection.close()
})