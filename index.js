const express = require('express')
const app = express()
app.use(express.json())

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


app.get('/api/personas', (request, response) => {
    response.json(personas)
})

app.get('/api/info', (request, response) => {

     let dateInfo = new Date();
     console.log(dateInfo)
    response.send(
        '<p>Phonebooh has info for '+ personas.length + ' people</p><p>'+ dateInfo + '</p>'
    )
})

app.get('/api/info', (request, response) => {

     let dateInfo = new Date();
     console.log(dateInfo)
    response.send(
        '<p>Phonebooh has info for '+ personas.length + ' people</p><p>'+ dateInfo + '</p>'
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
