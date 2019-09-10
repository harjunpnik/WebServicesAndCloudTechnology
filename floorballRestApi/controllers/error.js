//  Error handler
const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    
    //  If error is cast error and kind is Obeject ID we responed to user that error is in id
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if(error.message === 'Not found'){
        return res.status(404).json({ error: error.message })
    }
  
    next(error)
}

module.exports = errorHandler
