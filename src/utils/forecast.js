const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude + '&appid=99a61964883834c5838a8a829809cd9b&units=metric'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({error: 'Error. Could not connect to weather provider servers.'},)
        } else if (body.error) {
            callback({error: 'Error. Weather provider API response with an error.'},)
        } else {
            callback(undefined,{weather: body.weather[0].main, temp: body.main.temp, location: body.name}) 
        }
    })
}

module.exports = forecast