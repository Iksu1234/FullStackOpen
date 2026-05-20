import { useState } from 'react'

const Number = ({name}) => {
  return(
    <>
    <p>{name}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {name: newName}
    const result = checkForIdenticalName()
    console.log(result)

    if (!result) {
    setPersons(persons.concat(newPerson))
    setNewName('')
    console.log('add new name:', newName)
    console.log('persons:', persons)
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

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
        <p key={person.name}>{person.name}</p>
        )}
    </div>
  )
}

export default App