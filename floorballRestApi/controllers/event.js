const eventRouter =  require('express').Router()
const Event = require('../models/event')

//  GET ALL
eventRouter.get('/', (request, response) => {
    Event
      .find({})
      .then(event => {
        response.json(event)
    })
})

//  GET WITH ID
eventRouter.get('/:id', (req,res,next) =>{
  Event.findById(req.params.id)
  .then(documents => {
    if (documents) {
      res.json(documents.toJSON())
    } else {
      res.status(404).end() 
    }
  })
  .catch(error => {
    console.log(error)
    res.status(400).send({ error: 'malformatted id' })
  })
})

//  POST
eventRouter.post('/', (request, response) => {
    const event = new Event(request.body)

    event
      .save()
      .then(result => {
        response.status(201).json(result)
    })
})

//  UPDATE EVENT
eventRouter.put('/:id', (req, res, next) => {
  const event = {
    type: req.body.type,
    date: req.body.date,
    totalCost: req.body.totalCost,
    address: req.body.address,
    info: req.body.info
  }

  Event.findByIdAndUpdate(req.params.id, event, { new: true })
    .then(updateEvent => {
      res.json(updateEvent.toJSON())
    })
    .catch(error =>{
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

//  DELETE EVENT WITH ID
eventRouter.delete('/:id', (req, res, next) => {
  Event.findByIdAndRemove(req.params.id)
    .then(result =>{
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

module.exports = eventRouter 