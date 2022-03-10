const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: '6eer'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: '6eer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: '6eer'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error)
        } else {
            forecast(latitude,longitude, (error, { weather, temp }) => {
                if (error) {
                    res.send(error)
                } else {
                    res.send({
                        weather: weather + '. It is currently ' + temp + ' °C out.',
                        location,
                        address: req.query.address
                    })
                }
            })       
        }    
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: '6eer',
        msg: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: '6eer',
        msg: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
