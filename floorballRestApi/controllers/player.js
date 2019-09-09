const playerRouter =  require('express').Router()
const Player = require('../models/player')

playerRouter.get('/', (request, response) => {
    Player
      .find({})
      .then(player => {
        response.json(player)
    })
})

playerRouter.post('/', (request, response) => {
    const player = new Player(request.body)

    player
      .save()
      .then(result => {
        response.status(201).json(result)
    })
})

  module.exports = playerRouter 