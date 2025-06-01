import { useState, useEffect } from 'react'
import contactService from './services/phonebook'
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import Persons from "./Persons"
import Notification from "./Notification"

const App = () => {
  const { getAll, create, remove, update } = contactService
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-123'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [statusMessage, setStatusMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    getAll()
      .then(response => setPersons(response))
  }, [])

  const removeNote = (id) => {
    if (confirm(`delete ${persons.find(per => per.id === id).name}?`))
    remove(id)
      .then((response) => {
        setPersons(persons.filter((per) => {
          return per.id !== response.id
        }))
      })
  }

  const addNote = (event) => {
    setIsError(false)
    event.preventDefault()
    const newContact = {name: newName, number: newNumber}
    const prevContact = persons.find((per) => per.name === newName)

    if (!prevContact) {
      create(newContact)
        .then(response => {
          setPersons(persons.concat(response))
          setStatusMessage(`Added ${response.name}`)
          setTimeout(() => setStatusMessage(null), 5000)
        })
    } else {
      if (confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        update(prevContact.id, newContact)
          .then(result => {
            setPersons(persons.map((per) => {
              return per.id === result.id ? result : per
            }))
            setStatusMessage(`Changed ${result.name}'s number to ${result.number}`)
            setTimeout(() => setStatusMessage(null), 5000)
          })
          .catch(error => {
            setIsError(true)
            setPersons(persons.filter(per => per.name !== newName))
            setStatusMessage(`Contact not updated. Information of ${newName} has been removed from the server`)
            setTimeout(() => setStatusMessage(null), 5000)
          })
      }
    }
    setNewName("")
    setNewNumber("")
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMessage} error={isError}/>
      <Filter 
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add New Entry</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNote={addNote}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        filter={filter}
        removeNote={removeNote}
      />
    </div>
  )
}

export default App