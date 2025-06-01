import axios from 'axios'

function getAllNames() {
    return axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(result => result.data.map(country=>country.name.common))
}

function getCountryInfo(name) {
    return axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(result => {
            const data = result.data
            return {
                name: data.name.common,
                capitals: data.capital,
                languages: Object.values(data.languages),
                area: data.area,
                flagInfo: data.flags
            }
        })
}

export default { getAllNames, getCountryInfo }