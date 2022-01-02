import React, { useState, useEffect } from 'react'
import axios from "axios"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState("")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setShowAll(true)
    setNewFilter(event.target.value)
  }

  const changeShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <div>
      <div>find countries<input value={newFilter} onChange={handleFilterChange} /></div>
      <Countries countries={countries} filter={newFilter} changeShowAll={changeShowAll} showAll={showAll}/>
    </div>
  )
}

export default App