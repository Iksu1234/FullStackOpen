import { useState } from 'react'

const Filter = ({searchField, onChange}) => {
  return(
    <>
    <div>filter shown with 
      <input value={searchField} onChange={onChange}/>
    </div>
    </>
  )
}

const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return(
    <>
    <form onSubmit={addPerson}>
        <div>
          name: 
          <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
    </>
  )
}

const Persons = ({searchResults}) => {
  return(
    <>
      {searchResults.map(person => 
      <Person key={person.id} person={person}></Person>
      )}
    </>
  )
}

const Person = ({person}) => {
  return(
    <>
    <p key={person.id}>{person.name} {person.number}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([ 
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [searchResults, setSearchResults] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const id = persons.length + 1
    const newPerson = {name: newName, number: newNumber, id: id }
    const result = checkForIdenticalName()
    console.log(result)

    if (!result) {
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    console.log(`add new record: ${newName} ${newNumber} with id ${id} `)
    setSearchResults(persons.concat(newPerson))
    }
    
    else {
    alert(`Phonebook already contains the name ${newName} `)
    }
  }

  const checkForIdenticalName = () => {
    if (persons.some(e => e.name === newName)) {
      return true
    }
    return false
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
  
  setSearchField(event.target.value)
  
  if (event.target.value === "") {
    setSearchResults(persons)
  }
  else {
    const result = persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setSearchResults(result)
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchField={searchField} onChange={handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons searchResults={searchResults}/>
    </div>
  )
}

export default App