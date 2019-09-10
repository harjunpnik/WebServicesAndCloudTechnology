const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const playerRouter = require('./controllers/player')
const eventRouter = require('./controllers/event')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/players', playerRouter)
app.use('/api/events', eventRouter)

app.use((req,res,next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error)
})

const errorHandler = require('./controllers/error')
app.use(errorHandler)

module.exports = app 