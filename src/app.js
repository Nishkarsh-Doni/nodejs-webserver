const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Me'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText  : 'Helpful text',
        title: 'Help',
        name: 'Me'
    })
})


//req = request , res = response

// app.get('', (req, res) => {
//     res.send('Hello Express!')
// })

// app.get('/help', (req, res) => {    
//     res.send('Help Page!')
// })

// app.get('/about', (req, res) => {
//     res.send('About Page!')
// })



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
          
        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Me',
        errorMessage: 'Help article not found.'
    })
})








app.get('*', (req, res) => {
    res.render('404', {
    title: '404',
    name: 'Me',
    errorMessage: 'Page not found.'
    })
   })
app.listen(3000, () => {
    console.log('Server is up on Port : 3000.')
})