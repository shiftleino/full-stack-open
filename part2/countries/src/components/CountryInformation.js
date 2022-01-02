import React from 'react'

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
        </>
    )
}

export default CountryInformation