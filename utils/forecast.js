const request = require('request')

const forecast = (latitude, longitude, units = 'si', callback) => {
    const url = 'https://api.darksky.net/forecast/6be8548a558cf8cb4796bb2181ef021e/' + latitude + ',' + longitude + '?units=' + units

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast