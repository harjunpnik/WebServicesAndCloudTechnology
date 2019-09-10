const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Event = require('../models/event')

const initialEvents = [
    {
        _id: "5d769a2107c2910f003b529a",
        type: "Practice",
        date: "2019-09-15T00:00:00.000Z",
        totalCost: 20,
        address: "Kuvitteellinentie 2",
        info: "Kick-off to the season",
        __v: 0
    },
    {
        _id: "5d769a5b07c2910f003b529b",
        type: "Tournament",
        date: "2019-09-21T00:00:00.000Z",
        totalCost: 420,
        address: "Kuvitteellinentie 2",
        info: "Practice tournament",
        __v: 0
    },
    {
        _id: "5d776bc7e318b70ba42552c6",
        type: "Tournament",
        date: "2019-09-16T00:00:00.000Z",
        totalCost: 420,
        address: "Kalevantie 22",
        info: "Hometown tournament",
        __v: 0
    },
    {
        _id: "5d778e50f75ee324c0d4eb47",
        type: "Practice",
        date: "2001-02-14T22:00:00.000Z",
        totalCost: 245,
        address: "Kuvitteellinentie 2",
        info: "Practice before Major",
        __v: 0
    }
]


beforeEach(async () => {
    await Event.deleteMany({})
  
    let eventObject = new Event(initialEvents[0])
    await eventObject.save()
  
    eventObject = new Event(initialEvents[1])
    await eventObject.save()
    eventObject = new Event(initialEvents[2])
    await eventObject.save()
    eventObject = new Event(initialEvents[3])
    await eventObject.save()
})

describe('Events are returned properly', () => {

    test('Are returned as json', async () => {
        await api
          .get('/api/events')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
    
      test('There is 4 events', async () => {
        const response = await api.get('/api/events')
        expect(response.body.length).toBe(4)
      })
    
      test('There is an id property', async () => {
          const response = await api.get('/api/events')
          expect(response.body[0].id).toBeDefined()
      })
})

describe('A valid Event can be added', () => {

    test('If all data is correct', async () => {
        const newEvent = {
            type: "Tournament",
            date: "2019-09-27T00:00:00.000Z",
            totalCost: 523,
            address: "Majurinkuja 42",
            info: "Practice tournament in Vaasa"
        }  
      
        await api
          .post('/api/events')
          .send(newEvent)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/events')
      
        const info = response.body.map(r => r.info)
      
        expect(response.body.length).toBe(initialEvents.length + 1)
        expect(info).toContain("Practice tournament in Vaasa")
    })

    test('Event without cost defaults to 0', async () => {
        const newEvent = {
            type: "Tournament",
            date: "2019-09-27T00:00:00.000Z",
            address: "Majurinkuja 42",
            info: "Practice tournament in Vaasa"
        }   
      
        await api
          .post('/api/events')
          .send(newEvent)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/events')
        const totalCost = response.body.find(r => r.info === newEvent.info).totalCost
        expect(totalCost).toBe(0)
    })

    test('Event without info defaults to ""', async () => {
        const newEvent = {
            type: "Tournament",
            date: "2019-09-28T00:00:00.000Z",
            totalCost: 523,
            address: "Majurinkuja 42"
        }   
      
        await api
          .post('/api/events')
          .send(newEvent)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/events')
        console.log(response.body.find(r => r.date === newEvent.date))
        const info = response.body.find(r => r.date === newEvent.date).info
        expect(info).toBe("")
    })

})


describe('A Event wont be added', () => {

    test('If type is missing', async () => {
        const newEvent = {
            date: "2019-09-27T00:00:00.000Z",
            totalCost: 523,
            address: "Majurinkuja 42",
            info: "Practice tournament in Vaasa"
        }  
      
        await api
        .post('/api/events')
        .send(newEvent)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('If date is missing', async () => {
        const newEvent = {
            type: "Tournament",
            totalCost: 523,
            address: "Majurinkuja 42",
            info: "Practice tournament in Vaasa"
        }  
      
        await api
        .post('/api/events')
        .send(newEvent)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('If address is missing', async () => {
        const newEvent = {
            type: "Tournament",
            date: "2019-09-27T00:00:00.000Z",
            totalCost: 523,
            info: "Practice tournament in Vaasa"
    }  
      
        await api
        .post('/api/events')
        .send(newEvent)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('If type is not Tournament or Practice', async () => {
        const newEvent = {
            type: "Party",
            date: "2019-09-27T00:00:00.000Z",
            totalCost: 523,
            address: "Majurinkuja 42",
            info: "Practice tournament in Vaasa"
        }  
      
        await api
        .post('/api/events')
        .send(newEvent)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
})


afterAll(() => {
    mongoose.connection.close()
})