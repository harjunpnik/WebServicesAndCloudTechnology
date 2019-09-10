const playerRouter =  require('express').Router()
const Player = require('../models/player')

//  GET ALL
playerRouter.get('/', (req, res, next) => {
  Player
    .find({})
    .then(player => {
      res.json(player)
    })
    .catch(error => next(error))
})

//  GET WITH ID
playerRouter.get('/:id', (req, res, next) =>{
  Player.findById(req.params.id)
    .then(documents => {
      if (documents) {
        res.json(documents.toJSON())
      } else {
        res.status(404).send({ error: 'Not Found' }) 
      }
    })
    .catch(error => next(error))
})

//  POST
playerRouter.post('/', (req, res, next) => {
  const body = req.body

  if(!body.firstName){
    return res.status(400).send({ error: 'First name is missing' })
  }
  if(!body.lastName){
    return res.status(400).send({ error: 'Last name is missing' })
  }
  if(!body.email){
    return res.status(400).send({ error: 'Email is missing' })
  }
  if(!body.phone){
    return res.status(400).send({ error: 'Phone number is missing' })
  }
  if(!body.playerNr){
    return res.status(400).send({ error: 'Player number is missing' })
  }
  if(body.playerNr < 1 || body.playerNr > 99){
    return res.status(400).send({ error: 'Player number is not within the range 1-99' })
  }
  if(!body.position){
    return res.status(400).send({ error: 'Player position is missing' })
  }
  if(!(body.position == "Attacker" || body.position == "Defender" || body.position == "Goalkeeper")){
    return res.status(400).send({ error: 'Player position is not Attacker, Defender or Goalkeeper' })
  }

  const player = new Player(body)

  player
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

//  UPDATE PLAYER
playerRouter.put('/:id', (req, res, next) => {
  const body = req.body

  if(!body.firstName){
    return res.status(400).send({ error: 'First name is missing' })
  }
  if(!body.lastName){
    return res.status(400).send({ error: 'Last name is missing' })
  }
  if(!body.email){
    return res.status(400).send({ error: 'Email is missing' })
  }
  if(!body.phone){
    return res.status(400).send({ error: 'Phone number is missing' })
  }
  if(!body.playerNr){
    return res.status(400).send({ error: 'Player number is missing' })
  }
  if(body.playerNr < 1 || body.playerNr > 99){
    return res.status(400).send({ error: 'Player number is not within the range 1-99' })
  }
  if(!body.position){
    return res.status(400).send({ error: 'Player position is missing' })
  }
  if(!(body.position == "Attacker" || body.position == "Defender" || body.position == "Goalkeeper")){
    return res.status(400).send({ error: 'Player position is not Attacker, Defender or Goalkeeper' })
  }

  const player = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    playerNr: body.playerNr,
    position: body.position
  }

  Player.findByIdAndUpdate(req.params.id, player, { new: true })
    .then(updatePlayer => {
      res.json(updatePlayer.toJSON())
    })
    .catch(error => next(error))
})

//  DELETE PLAYER WITH ID
playerRouter.delete('/:id', (req, res, next) => {
  Player.findByIdAndRemove(req.params.id)
    .then(result =>{
      res.status(204).end()
    })  
    .catch(error => next(error))
})

module.exports = playerRouter 