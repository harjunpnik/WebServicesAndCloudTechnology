const eventRouter =  require('express').Router()
const Event = require('../models/event')

//  GET ALL
eventRouter.get('/', (req, res, next) => {
  Event
  .find({})
  .then(event => {
    res.json(event)
  })
  .catch(error => next(error))
})

//  GET WITH ID
eventRouter.get('/:id', (req, res, next) =>{
  Event.findById(req.params.id)
    .then(documents => {
      if (documents) {
        res.json(documents.toJSON())
      } else {
        res.status(404).end() 
      }
    })
    .catch(error => next(error))
})

//  POST
eventRouter.post('/', (req, res, next) => {
  const body = req.body

  if(!body.type){
    return res.status(400).send({ error: 'Type is missing' })
  }
  if(!(body.type == "Practice" || body.type == "Tournament" )){
    return res.status(400).send({ error: 'Event type is not Practice or Tournament' })
  }
  if(!body.date){
    return res.status(400).send({ error: 'Date is missing' })
  }
  if(!body.address){
    return res.status(400).send({ error: 'Address is missing' })
  }
  body.totalCost = body.totalCost!= undefined ? body.totalCost : 0

  const event = new Event(body)

  event
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

//  UPDATE EVENT
eventRouter.put('/:id', (req, res, next) => {
  const body = req.body

  if(!body.type){
    return res.status(400).send({ error: 'Type is missing' })
  }
  if(!(body.type == "Practice" || body.type == "Tournament" )){
    return res.status(400).send({ error: 'Event type is not Practice or Tournament' })
  }
  if(!body.date){
    return res.status(400).send({ error: 'Date is missing' })
  }
  if(!body.address){
    return res.status(400).send({ error: 'Address is missing' })
  }

  const event = {
    type: body.type,
    date: body.date,
    totalCost: body.totalCost!= undefined ? body.totalCost : 0,
    address: body.address,
    info: body.info
  }

  Event.findByIdAndUpdate(req.params.id, event, { new: true })
    .then(updateEvent => {
      res.json(updateEvent.toJSON())
    })
    .catch(error => next(error))
})

//  DELETE EVENT WITH ID
eventRouter.delete('/:id', (req, res, next) => {
  Event.findByIdAndRemove(req.params.id)
  .then(result =>{
    res.status(204).end()
  })
  .catch(error => next(error))
})

module.exports = eventRouter 