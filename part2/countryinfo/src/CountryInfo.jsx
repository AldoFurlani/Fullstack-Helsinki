import { useState, useEffect } from 'react'

function CountryInfo({ countries, filter, getCountryInfo, getWeather }) {
    const [countryInfo, setCountryInfo] = useState(null)
    const [weather, setWeather] = useState(null)

    function handleShow(country) {
        getCountryInfo(country)
            .then(info => {
                setCountryInfo(info)
            })
    }
    const shownCountries = countries.filter(country => country.toLowerCase().includes(filter.toLowerCase()))
    const countryElements = shownCountries.map(country=><p key={country}>{country}&nbsp;<button onClick={()=>handleShow(country)}>show</button></p>)
    
    useEffect(() => {
        if (countryInfo) {
            setCountryInfo(null)
            setWeather(null)
        }
    }, [filter])

    useEffect(() => {
        if (countryInfo) {
            getWeather(countryInfo.capitals[0])
                .then(weather => setWeather(weather))
        }
    }, [countryInfo])

    if (countryInfo && weather) {
        return (
            <div>
                <h1>{countryInfo.name}</h1>
                <p>Capital {countryInfo.capitals}</p>
                <p>Area {countryInfo.area}</p>
                <h2>Languages</h2>
                <ul>
                    {countryInfo.languages.map(lan=><li key={lan}>{lan}</li>)}
                </ul>
                <img 
                    src={countryInfo.flagInfo.png}
                    alt={countryInfo.flagInfo.alt}
                />
                <h2>Weather in {countryInfo.capitals[0]}</h2>
                <p>Temperature {`${Math.round(((weather.temp - 273.15) * 100))/100} Celsius`}</p>
                <img 
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={`${weather.description} icon`}
                />
                <p>Wind {weather.wind} m/s</p>
            </div>
        )
    } else {
        return (
            <div>
                {shownCountries.length <= 10 ? countryElements : 'Too many matches, specify another filter'}
            </div>
        )
    }
}

export default CountryInfo