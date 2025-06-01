import axios from 'axios'

function getWeather(city) {
    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_SOME_KEY}`)
        .then(response => {
            const data = response.data
            return {
                temp: data.main.temp,
                wind: data.wind.speed,
                icon: data.weather[0].icon,
                description: data.weather[0].description
            }
        })
}

export default getWeather