import { useCallback, useEffect, useState } from 'react'
import finland from './finland'
import axios from 'axios'


const Filter = ({searchField, onChange}) => {
  return(
    <>
    <div>find countries <input value={searchField} onChange={onChange}/></div>
    </>
  )
}

const Weather = ({country, weatherData}) => {

  if (weatherData.length != 0) {
     return(
    <>
    <h2>Weather in {country.capital}</h2>
    <p>Temperature {weatherData.main.temp} Celsius</p>
    <img src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`}></img>
    <p>Wind {weatherData.wind.speed} m/s</p>
    </>
  ) 
  }
}

const Countries = ({searchResults, countryCount, isSelected, weatherData}) => {
      return(
    <>
      {searchResults.map(country =>   
      <Country key={country.name.common} country={country} 
      countryCount={countryCount} isSelected={isSelected} weatherData={weatherData}></Country>
      )}
    </>
  )
}

const Country = ({country, countryCount, isSelected, weatherData}) => {

  
  let languages = []
  try {
  languages = Object.values(country.languages)
  } catch (error) {
    console.log("object value error on country: ",country.name.common );
  }

  const handleShowClick = (event) => {
    event.preventDefault()
    isSelected(country.ccn3)
  }

  if (countryCount == 1) {
  return(
    <>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital}</p>
    <p>Area: {country.area}</p>
    <h2>Languages</h2>
    <ul>
      {languages.map((language,i) =>
      <li key={i}>{language}</li>
      )}  
    </ul>
    <img src={country.flags.svg} width="200" height="100"></img>
    <Weather country={country} weatherData={weatherData}></Weather>
    </> 
  )}
  else if (countryCount <= 10) {
    return(
      <>
      <p>{country.name.common} <button onClick={handleShowClick}>Show</button></p>
      </>
    ) 
  }
}

function App() {



  const [countries, setCountries] = useState([])
  const [countryCount, setCountryCount] = useState(null)
  const [searchField, setSearchField] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [alert, setAlert] = useState('')
  const [isSelected, setIsSelected] = useState('')
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      setCountries(response.data)     
    })
    .catch(error => {
      console.log("GET error:", error);  
    })
  }, [])

  const getWeatherData = (target) => {

    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${target[0].capital},${target[0].cca2}&units=metric&APPID=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
    .then(response => {
      setWeatherData(response.data)  
      })
    .catch(error => {
      console.log("Weather GET error: ", error);  
    })
  }
  
  const handleSelection = (ccn3) => {
    const result = countries.filter((country) => country.ccn3 === ccn3)
    setSearchResults(result)
    setCountryCount(1)
    getWeatherData(result)
  }

  const handleSearchChange = (event) => {
  
  setSearchField(event.target.value)
  
  if (event.target.value === "") {
    setSearchResults([])
    setAlert(null)
  }
  else {
    const result = countries.filter((country) => country.name.common.toLowerCase()
    .includes(event.target.value.toLowerCase()))
    setCountryCount(result.length)
    if (result.length > 10) {
      setAlert("Too many matches, specify another filter")
    }
    else {
      setAlert(null)
      setSearchResults(result)
    }

  }
  }
  return (
    <>
      <Filter searchField={searchField} onChange={handleSearchChange}></Filter>
      <div>{alert}</div>
      <Countries searchResults={searchResults} countryCount={countryCount} 
      isSelected={handleSelection} weatherData={weatherData}></Countries>
    </>
  )
}

export default App
