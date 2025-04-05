import { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)
  const [weather, setWeather] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (filteredCountries && filteredCountries.length === 1) {
      const country = filteredCountries[0]

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [filteredCountries])

  const handleChange = (event) => {
    const s = event.target.value
    setSearch(s)
    setFilteredCountries(countries.filter(country =>
      country.name.common.toLowerCase().includes(s.toLowerCase()
      )))
  }

  const handleShow = (name) => {
    setSearch(name.toLowerCase())
    setFilteredCountries(countries.filter(country =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
    ))
  }

  if (!countries) {
    return null
  }

  return (
    <>
      Find countries <input value={search} onChange={handleChange} />
      <Countries filteredCountries={filteredCountries} weather={weather} handleShow={handleShow} />
    </>
  )
}

export default App