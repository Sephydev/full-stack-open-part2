const Countries = ({ countries, search, handleShow }) => {

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search))

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map(country =>
          <li key={country.name.common}>
            {country.name.common} <button onClick={() => handleShow(country.name.common)}>Show</button>
          </li>
        )}
      </ul>
    )
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    const languages = Object.values(country.languages)

    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {languages.map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </>
    )
  }

  return (
    <p>Country not found</p>
  )
}

export default Countries