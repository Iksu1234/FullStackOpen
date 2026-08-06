const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    var length = persons.length
    var date = new Date()
    date[Symbol.toPrimitive]("string");
    response.send(`Phonebook has info for ${length} people <br><br>${date}`)
})


app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(note => note.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
    const id = Math.floor(Math.random() * 9000);
    return id
}

const checkName = (name) => {
        let result = false
        persons.forEach(person => {
        if (person.name.toLowerCase() == name.toLowerCase()){
            console.log("name true")
            result = true
            return
        }
    });
    console.log("name false")
    return result
}

const checkNumber = (number) => {
    let result = false
    persons.forEach(person => {
        if (person.number == number){
            console.log("number true")
            result = true
            return
        }
    });
    console.log("number false")
    return result
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body);
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name and / or number is missing' 
    })
  }

  if (checkName(body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
    console.log("name fail")
  }

  if (checkNumber(body.number)) {
    return response.status(400).json({ 
      error: 'number must be unique' 
    })
    console.log("number fail")
  }
  
  const person = {
    id: generateId().toString(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})
  
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})