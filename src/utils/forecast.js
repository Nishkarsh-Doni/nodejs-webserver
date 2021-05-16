const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/163b483923d21d5674d49a366bd82588/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, {body}) => {
        const data = body
        if (error) {
            callback('Unable to connect to Weather App!! :(', undefined)
        }
        else if (data.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, data.daily.data[0].summary + ' It is currently ' + data.currently.temperature + ' degrees Celsius out.There is a chance of ' + data.currently.precipProbability + '% of chance of rain')
        }
    })
}

module.exports = forecast