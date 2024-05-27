const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())


  morgan.token('body', req => {
    return JSON.stringify(req.body)
  })

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let personas = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
    response.json(personas)
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
    const id = Number(request.params.id)
    const persona = personas.find(persona => persona.id === id)

    if (persona) {
        response.json(persona)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    personas = personas.filter(persona => persona.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 9999)
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }else{
        personas.forEach(persona => {
            if (persona.name===body.name) {
                return response.status(400).json({
                    error: 'name must be unique'
                })
            }
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const persona = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    personas = personas.concat(persona)

    response.json(persona)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
