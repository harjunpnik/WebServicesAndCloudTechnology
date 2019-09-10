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
  });
});

//  POST
eventRouter.post('/', (request, response) => {
    const event = new Event(request.body)

    event
      .save()
      .then(result => {
        response.status(201).json(result)
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