import React from 'react'
import Country from './Country'
import CountryInformation from "./CountryInformation"

const Countries = (props) => {
    if (props.filter.length !== 0) { 
        const countries = props.countries.filter(country => country.name.common.toLowerCase().includes(props.filter.toLowerCase()))
        if (10 >= countries.length && countries.length > 1) {
            return (
                <>
                {countries.map((country) =>
                    <Country key={country.cioc} name={country.name.common} />
                )}
                </>
            )
        } else if (countries.length === 1) {
            return <CountryInformation key={countries[0].cioc} country={countries[0]} />
        } else {
            return (
                <div>Too many matches, specify another filter</div>
            )
        }
    } else {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
} 

export default Countries