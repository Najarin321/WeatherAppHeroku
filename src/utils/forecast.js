const axios = require('axios')


const getTemp = (lat, long, callback) => {
    const urlWeather = `http://api.weatherstack.com/current?access_key=25b9e2da8e6570491324903389f6f9dd&query=${lat},${long}`
    axios.get(urlWeather).then(response => {
        callback({
            temperatura: response.data.current.temperature,
            chanceChuva: response.data.current.precip * 100,
            local: `${response.data.location.region}, ${response.data.location.country}`,
            climaDesc: response.data.current.weather_descriptions[0],
            isDay: response.data.current.is_day === "yes" ? "day" : "night"
        })
    }).catch(error => callback({error : error.message}))
}

module.exports = getTemp