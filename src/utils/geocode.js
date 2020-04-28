const axios = require('axios')


const getLatLon = (query, callback) => {
    const urlGeoCode = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=pk.eyJ1IjoibWFyY29zbHVjYXMiLCJhIjoiY2s5Nzg5M3V1MDgycDNlbm9hdG5sZG81MCJ9.WezNC9OG1zyz11VyOTH0Wg`
    axios.get(urlGeoCode).then(response => {
        callback({longitude: response.data.features[0].center[0],
                    latitude: response.data.features[0].center[1]
                })
    }).catch(error => callback({error: error.message}))
}

module.exports = getLatLon