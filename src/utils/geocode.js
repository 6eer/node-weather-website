const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiNmVlciIsImEiOiJjbDBqazhieXUwZGJsM2Rxa213aTZnaHZtIn0.JGILrfk-iBeXa125Tv3LiA'
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({error: 'Error. Could not connect to maps provider servers.'},)
        } else if (body.features.length === 0) {
            callback({error: 'Unable to find location. Try another search.'},)
        } else {
            callback(undefined,{latitude: body.features[0].center[1] , longitude: body.features[0].center[0], location: body.features[0].place_name})
        }
    })
}

module.exports = geocode