const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VuYW5kYW4iLCJhIjoiY2t2dDFzeGtoMzhodjJudGtiNmdyNTFnciJ9.XnJ_aZGUPEaSRXjA_UOX8Q&limit=1'

	request({ url, json: true}, (error, {body}) => {
		if (error) {
			callback('Unable to connect location services.', undefined)
		} else if (body.features.length === 0) {
			callback('Unable to find locaton. Try another search.', undefined)
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})
}

module.exports = geocode