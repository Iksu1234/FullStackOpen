import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [onError, setOnError] = useState(false)

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

    const newPerson = {name: newName, number: newNumber}

    personService
      .create(newPerson)
      .then(returnedPerson => {

        console.log("response: ", returnedPerson);

        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSearchResults(persons.concat(returnedPerson))

        console.log(`add new record: ${returnedPerson.name} ${returnedPerson.number} with id ${returnedPerson.id} `)
        setNotificationMessage(
          `added: ${newName}`
          )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      })
      .catch(error => {
        setOnError(true)
        setNotificationMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setNotificationMessage(null)
            setOnError(false)
          }, 3000)
        console.log(error.response.data.error);     
      })
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
          
          setPersons(newPersons)
          setSearchResults(newPersons)
          setNewName('')
          setNewNumber('')

          setNotificationMessage(
            `edited: ${newName}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
          })

          .catch(error => {
          console.log(error.response.data.error);  

          setOnError(true)
          setNotificationMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setNotificationMessage(null)
            setOnError(false)
          }, 3000)
 
          })
        }})}
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

          setNotificationMessage(
            `${person.name} deleted`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        }
        else{
          console.log("delete error");     
        }
      });
      })
      .catch(error => {
        console.log("delete error: ", error);

        setOnError(true)
        setNotificationMessage(
            `${person.name} has already been deleted from the server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
            setOnError(false)
          }, 3000)
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
    const result = persons.filter((person) => person.name.toLowerCase()
    .includes(event.target.value.toLowerCase()))
    setSearchResults(result)
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} error={onError}></Notification>
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