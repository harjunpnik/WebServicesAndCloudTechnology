const mongoose = require('mongoose')
//mongoose.set('useFindAndModify', false)

const playerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    playerNr: Number,
    position: String
})

playerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Player', playerSchema)