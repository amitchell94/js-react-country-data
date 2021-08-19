import './App.css';
import axios from 'axios'
import {useEffect, useState} from "react";

const CountryData = ({country, weatherData}) => {
    let temperature = "??"
    if (weatherData != null) {
        temperature = weatherData.temperature
    }

    return (
        <div>
            <h2>{country.name}</h2>
            capital {country.capital}
            <br/>
            population {country.population}
            <h3>Languages</h3>
            <ul>
                {country.languages.map((language, i) =>
                    <div key={i}>{language.name}</div>
                )}
            </ul>
            <img src={country.flag} alt="flag" width="100px"/>
            <h3>Weather in {country.capital}</h3>
            temperature = {temperature} degC
        </div>
    )
}

const Countries = ({countries, onClick, getWeather, weatherData}) => {

    if (countries.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    } else if (countries.length === 1) {
        getWeather(countries[0].capital)
        return (
            <CountryData country={countries[0]} weatherData={weatherData}/>)
    } else {
        return (
            <ul>
                {countries.map((country, i) =>
                    <div key={i}>{country.name}
                        <button onClick={() => onClick(country.name)}>show</button>
                    </div>
                )}
            </ul>
        )
    }
}

function App() {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [weatherQuery, setWeatherQuery] = useState('')
    const [weatherData, setWeatherData] = useState([])

    useEffect(() => {
        let url = ""
        if (filter.length > 0) {
            url = `https://restcountries.eu/rest/v2/name/${filter}`
        } else {
            url = `https://restcountries.eu/rest/v2/all`
        }

        axios
            .get(url)
            .then(response => {
                setCountries(response.data)
            })
    }, [filter])

    useEffect(() => {
        let url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${weatherQuery}`

        axios
            .get(url)
            .then(response => {
                console.log(response.data)
                setWeatherData(response.data.current)
            })
    }, [weatherQuery])

    const getWeather = (city) => {
        setWeatherQuery(city)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const setFilterValue = (value) => {
        setFilter(value)
    }

    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange}/>
            <Countries
                countries={countries}
                onClick={setFilterValue}
                getWeather={getWeather}
                weatherData={weatherData}
            />
        </div>
    );
}

export default App;
