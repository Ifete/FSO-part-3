require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
const cors = require('cors')
app.use(express.static('dist'))
const Person = require('./models/person')

app.use(cors())


morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/info', (request, response) => {

    let dateInfo = new Date();
    console.log(dateInfo)
    response.send(
        '<p>Phonebooh has info for ' + personas.length + ' people</p><p>' + dateInfo + '</p>'
    )
})

app.get('/api/info', (request, response) => {

    let dateInfo = new Date();
    console.log(dateInfo)
    response.send(
        '<p>Phonebooh has info for ' + personas.length + ' people</p><p>' + dateInfo + '</p>'
    )
})


app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => {
        console.log(error)
        response.status(500).send({ error: 'malformatted id' })
    })
})


app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
const generateId = () => {
    return Math.floor(Math.random() * 9999)
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    } else {
        const person = new Person({
            name: body.name,
            number: body.number,
        })

        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
    }

})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
