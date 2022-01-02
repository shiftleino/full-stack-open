import React, { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) !== -1) {
      window.alert(`${newName} is alreade added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
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
          <Person key={person.name} name={person.name} number={person.number} />
        )}
      </div>
    </div>
  )
}

export default App