const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./models/person')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const morgan = require('morgan')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan('\nMethod:\t:method\nPath:\t:url\nRes:\t:status\nPing:\t:response-time ms\nBody:\t:body \n---'));

app.get('/api/persons', (req, res, next) => {
  Person.find({})
  .then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  Person.find({})
  .then(persons => {
    res.send(`
          <p>Phonebook has info for ${persons.length} people</p>
          <p>${new Date()}</p>
      `)
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  Person.findOne({ 'name': body.name }, 'id')
    .then(id => {
      if (id) {
        response.json({
          'error':'HÄLYTYS TÄÄLLÄ TAPAHTUI VIRHE',
          'id':id.id,
        })
      } else {

        const person = new Person({
          name: body.name,
          number: body.number,
        })

        person.save()
          .then(savedPerson => {
            response.json(savedPerson.toJSON)
          })
          .catch(error => next(error))
      }
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true})
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})