import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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

const Persons = ({searchResults, onDelete}) => {
  return(
    <>
      {searchResults.map(person => 
      <Person key={person.id} person={person} onDelete={onDelete}></Person>
      )}
    </>
  )
}

const Person = ({person, onDelete}) => {

  const handleDeleteClick = (event) => {
    event.preventDefault()
    onDelete(person)
  }

  return(
    <>
    <p key={person.id}>{person.name} {person.number} <button onClick={handleDeleteClick}>delete</button></p> 
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
  console.log('get')

  personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      setSearchResults(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const result = checkForIdenticalName()

    if (!result) {

    const id = (persons.length + 1).toString()
    console.log("id:", id);
    const newPerson = {name: newName, number: newNumber, id: id }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    console.log(`add new record: ${newName} ${newNumber} with id ${id} `)

    personService
      .create(newPerson)
      .then(returnedPerson => {
        console.log("response: ", returnedPerson);
      })  
    setSearchResults(persons.concat(newPerson))
    }   
    else {

    const confirmCheck = window.confirm(`${newName} is already added to the phonebook,
    replace the old number with a new one?`)

    if (confirmCheck) {

      persons.forEach(arrayPerson => {
        if (arrayPerson.name.toLowerCase() === newName.toLowerCase()) {

          console.log("1: ",arrayPerson.name);
          console.log("2: ",newName);
          const index = persons.indexOf(arrayPerson)
          console.log("person to update: ",persons[index]);

          const newPerson = {name: arrayPerson.name, number: newNumber, id: arrayPerson.id }

          let newPersons = [...persons]
          newPersons[index] = newPerson
          console.log("newPersons:", newPersons);
          
          personService
          .update(arrayPerson.id ,newPerson)
          .then(response => {
          console.log("response: ", response);
          }) 

          setPersons(newPersons)
          setSearchResults(newPersons)
          setNewName('')
          setNewNumber('')
        }})}

      else{
          console.log("update error");     
        }
      }
  }

  const deletePerson = (person) => {

    const result = window.confirm(`Delete ${person.name} ?`)

    if (result) {
      personService
      .remove(person.id)
      .then(response => {
      console.log("response: ", response);
      
      persons.forEach(arrayPerson => {
        if (arrayPerson.id === person.id) {
          console.log("1: ",arrayPerson.id);
          console.log("2: ",person.id);
          const index = persons.indexOf(arrayPerson)
          console.log("index to delete: ",index);
          
          const newPersons = persons.toSpliced(index,1)
          console.log("newpersons:", newPersons);
          
          setPersons(newPersons)
          setSearchResults(newPersons)
        }
        else{
          console.log("delete error");     
        }
      });

      })
      .catch(error => {
        console.log(error);
        throw error
      })
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
      <Persons searchResults={searchResults} onDelete={deletePerson} />
    </div>
  )
}

export default App