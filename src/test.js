const express = require('express')
const app = express()
const path = require('path')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const address = process.argv[2]

const getWeather = function () {
    if (!address) {
        console.log('Please provide an address')
    } else {
        geocode(address, (error, data) => {
            if (error) {
                return console.log(error)
            }

            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }
                console.log(data.location, forecastData)
                return {
                    location: data.location,
                    forecast: forecastData
                }
                // res.send({location: data.location, forecast: forecastData})
            })
        })
    }
}

const publicDirectoryPath = path.join(__dirname, '../public') //serve public static assets
const viewsPath = path.join(__dirname, '../templates/views') //serve html templates
console.log(viewsPath)
console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath)) //set static assets path
app.set('view engine', 'hbs') //set view engine as Handlebars
app.set('views', viewsPath) //set html templates path

app.get('', (req, res) => {
    res.render('index')
})

app.get('/help', (req, res) => {
    res.send('Help page!')
})

app.get('/about', (req, res) => {
    res.send('About')
})

// app.get('*', (req, res) => {
//     res.send('404 Page not found')
// })

app.get('/weather', (req, res) => {
    let address = req.query.address;
    let units = req.query.units;
    if (!address) {
        console.log('Please provide an address')
    } else {
        geocode(address, (error, data) => {
            if (error) {
                return console.log(error)
            }

            forecast(data.latitude, data.longitude, units, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }
                console.log(data.location, forecastData)
                res.send({location: data.location, forecast: forecastData, address})
            })
        })
    }
})

app.listen(3000, () => {
    console.log('Server is up on port 3000....')
})