const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const puclicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(puclicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		name: 'Sunandan Gupta',
		title: 'Weather App'
	})
}) 

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About us',
		name: 'Sunandan Gupta'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'Get help',
		title: 'Help page',
		name: 'Sunandan Gupta'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide address.'
		})
	}

	geocode(req.query.address, (error, {longitude, latitude, location} = {} ) => {
		if (error) {
			return res.send({
				error
			})
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				})
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		})
	})
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search.'
		})
	}

	console.log(req.query)
	res.send({
		product: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Error_404',
		error: 'Help page not found.'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Error_404',
		error: 'Page not found.'
	})
})

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})