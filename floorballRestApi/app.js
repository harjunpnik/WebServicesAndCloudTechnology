const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const playerRouter = require('./controllers/player')
const eventRouter = require('./controllers/event')
const mongoose = require('mongoose')
const errorHandler = require('./controllers/error')

console.log('connecting to', config.MONGODB_URI)
//  Connect to MongoDB
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true , useUnifiedTopology: true })

//  Use Morgan, Cors and bodyparser
app.use(morgan(':method :url :status :response-time ms :content'))
morgan.token('content', function (req, res) { return JSON.stringify(req.body) })
app.use(cors())
app.use(bodyParser.json())

//  Routers
app.use('/api/players', playerRouter)
app.use('/api/events', eventRouter)

//  Error handling
app.use((req,res,next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error)
})

app.use(errorHandler)

module.exports = app 