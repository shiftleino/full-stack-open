import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

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
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNewName("")
            setNewNumber("")
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName("")
          setNewNumber("")
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
        .then(setPersons(persons.filter(person => person.id !== id)))
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