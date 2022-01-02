import React, { useState, useEffect } from 'react'
import axios from "axios"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <div>find countries<input value={newFilter} onChange={handleFilterChange} /></div>
      <Countries countries={countries} filter={newFilter} />
    </div>
  )
}

export default App