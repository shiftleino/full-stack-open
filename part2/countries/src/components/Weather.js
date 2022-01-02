import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = (props) => {
    const api_key = process.env.REACT_APP_API_KEY
    const link = `http://api.weatherstack.com/current?access_key=${api_key}&query=${props.city}` 
    const [weather, setWeather] = useState({})
    
    useEffect(() => {
        axios
        .get(link)
        .then(response => {
            setWeather(response.data.current)
        })
    }, [props.city])

    return (
        <>
            <div><b>temperature:</b> {weather.temperature} Celcius</div>
            <img src={weather.weather_icons} alt="Weather icon" />
            <div><b>wind:</b>{weather.wind_speed} mph direction {weather.wind_dir}</div>
        </>
    )
}

export default Weather