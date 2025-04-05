import { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  if (!countries) {
    return null
  }

  return (
    <>
      Find countries <input value={search} onChange={handleChange} />
      <Countries countries={countries} search={search} />
    </>
  )
}

export default App