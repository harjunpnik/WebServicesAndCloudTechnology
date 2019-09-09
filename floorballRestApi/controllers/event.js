const eventRouter =  require('express').Router()
const Event = require('../models/event')

eventRouter.get('/', (request, response) => {
    Event
      .find({})
      .then(event => {
        response.json(event)
    })
})

eventRouter.post('/', (request, response) => {
    const event = new Event(request.body)

    event
      .save()
      .then(result => {
        response.status(201).json(result)
    })
})

  module.exports = eventRouter 