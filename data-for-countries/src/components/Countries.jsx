const Countries = ({ filteredCountries, weather, handleShow }) => {
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

  if (filteredCountries.length === 1 && weather) {
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
        <h2>Weather in {country.capital}</h2>
        <p>Temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>Wind {weather.wind.speed} m/s</p>
      </>
    )
  }

  return (
    <p>Country not found</p>
  )
}

export default Countries