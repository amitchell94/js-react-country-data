import './App.css';
import axios from 'axios'
import {useEffect, useState} from "react";

const Countries = ({countries}) => {
    if (countries.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    } else if (countries.length === 1) {
        return (<div>Do this later</div>)
    } else {
        return (
            <ul>
                {countries.map((country, i) =>
                    <div key={i}>{country.name}</div>
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
    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange}/>
            <Countries countries={countries} />
        </div>
    );
}

export default App;
