const request = require('request')

const forecast = (lati, longi, callback) => {
	const url = 'https://api.darksky.net/forecast/5575c8ba7426b8ee259fbefac0417b8a/'+ lati + ',' + longi + '?units=si';

	request( { url, json: true}, (error, {body}) => {
		if (error){
			callback('Unable to connect to weather service.', undefined)
		} else if (body.error) {
			callback('Unable to find location. Try another coordinates.', undefined)
		} else {
			callback(undefined, body.daily.data[0].summary + 'The temperature is ' + body.currently.temperature + ' degree celcius. The chances of precipitation is ' + body.currently.precipProbability + '.')
		}
	})
}

module.exports = forecast