import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [notification, setNotification] = useState(null)
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) !== -1) {
      const result = window.confirm(`${newName} is alreade added to phonebook, replace the old number with a new one?`)
      if (result) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setSuccess(true)
            setNotification(`Updated phone number of ${newName}`)
            setTimeout(() => setNotification(null), 5000)
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNewName("")
            setNewNumber("")
          })
          .catch(() => {
            setNotification(`Updating the number of ${newName} failed.`)
            setTimeout(() => setNotification(null), 5000)
            setSuccess(false)
            setPersons(persons.filter(p => p.name !== newName))
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(data => {
          setNotification(`Added ${newName}`)
          setTimeout(() => setNotification(null), 5000)
          setPersons(persons.concat(data))
          setNewName("")
          setNewNumber("")
          setSuccess(true)
        })
    } 
  }

  const deletePerson = (event) => {
    event.preventDefault()
    const id = parseInt(event.target.id)
    const name = persons.find(person => person.id === id).name
    const result = window.confirm(`Are you sure you want to delete ${name}?`)
    if (result) {
      personService
        .deleteOne(event.target.id)
        .then(() => {
          setSuccess(true)
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`Deleted ${name}`)
          setTimeout(() => setNotification(null), 5000)
        })
    }
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
      <Notification message={notification} success={success}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person => 
          <Person key={person.id} name={person.name} number={person.number}  handleClick={deletePerson} id={person.id} />
        )}
      </div>
    </div>
  )
}

export default App