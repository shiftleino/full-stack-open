import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) !== -1) {
      window.alert(`${newName} is alreade added to phonebook`)
    } else {
      const newPerson = { name: newName }
      setPersons(persons.concat(newPerson))
      setNewName("")
    } 
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input  value={newName} onChange={handlePersonChange}  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <Person key={person.name} name={person.name} />
        )}
      </div>
    </div>
  )
}

export default App