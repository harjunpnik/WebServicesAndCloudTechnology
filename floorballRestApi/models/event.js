const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const eventSchema = mongoose.Schema({
    type: String,
    date: Date,
    totalCost: Number,
    address: String,
    info: String
})

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Event', eventSchema)