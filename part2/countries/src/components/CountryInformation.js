import React from 'react'
import Weather from './Weather'

const CountryInformation = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => 
                    <li key={language}> {language}</li>
                )}
            </ul>
            <img src={country.flags.png} alt="Flag"/>
            <h2>Weather in {country.capital[0]}</h2>
            <Weather city={country.capital[0]}/>
        </>
    )
}

export default CountryInformation