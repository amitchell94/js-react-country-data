import './App.css';
import axios from 'axios'
import {useEffect, useState} from "react";

const Countries = ({countries, onClick}) => {
    if (countries.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    } else if (countries.length === 1) {
        const country = countries[0]
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
            </div>)
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

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const setFilterValue = (value) => {
        setFilter(value)
    }

    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange}/>
            <Countries countries={countries} onClick={setFilterValue}/>
        </div>
    );
}

export default App;
