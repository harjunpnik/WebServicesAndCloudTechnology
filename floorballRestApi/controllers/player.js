const playerRouter =  require('express').Router()
const Player = require('../models/player')

//  GET ALL
playerRouter.get('/', (req, res) => {
    Player
      .find({})
      .then(player => {
        res.json(player)
    })
})

//  GET WITH ID
playerRouter.get('/:id', (req,res,next) =>{
  Player.findById(req.params.id)
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
playerRouter.post('/', (req, res) => {
    const player = new Player(req.body)

    player
      .save()
      .then(result => {
        res.status(201).json(result)
    })
})

//  DELETE PLAYER WITH ID
playerRouter.delete('/:id', (req, res, next) => {
  Player.findByIdAndRemove(req.params.id)
    .then(result =>{
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

module.exports = playerRouter 