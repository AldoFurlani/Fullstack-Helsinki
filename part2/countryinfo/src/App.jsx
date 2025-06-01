import { useState, useEffect } from 'react'
import countryServices from './services/country'
import getWeather from './services/weather'
import CountryInfo from './CountryInfo'

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const { getAllNames, getCountryInfo } = countryServices

  useEffect(() => {
    getAllNames()
      .then(result => setCountries(result))
  }, [])

  return (
    <div>
      find countries &nbsp;
      <input 
        value={filter}
        onChange={e => setFilter(e.currentTarget.value)}
      />
      <CountryInfo
        countries={countries}
        filter={filter}
        getCountryInfo={getCountryInfo}
        getWeather={getWeather}
      />
    </div>
  )
}

export default App
