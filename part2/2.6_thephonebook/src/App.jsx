import { useState } from 'react'

const Number = ({name}) => {
  return(
    <>
    <p>{name}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number:  '040-123123' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const result = checkForIdenticalName()
    console.log(result)

    if (!result) {
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    console.log(`add new record: ${newName} ${newNumber} `)
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
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
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
      <h2>Numbers</h2>
        {persons.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
        )}
    </div>
  )
}

export default App