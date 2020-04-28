const path = require('path')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const hbs = require('hbs')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // mudar o caminho de um diretorio no express
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        me: {
            name: 'Marcos Lucas' ,
            descricao: 'A young guy who makes success with gatinhas'
        }
    }) //render procura na pasta views
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must fill the address to find a place'
        })
    }

    geocode(req.query.address, (data, error) => {
        if(data.error){
            return res.send({
                error : 'Could not find this address'
            })
        }
        
        forecast(data.latitude, data.longitude, (forecastData, error) => {
            if (forecastData.error){
                return res.send({
                    error : 'Could not find this forecast'
                })
            }
            
            res.send({
                address: forecastData.local,
                forecast: forecastData.temperatura,
                chanceChuva: forecastData.chanceChuva
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
    products: []
    })

    
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        me: {
            name: 'Marcos Lucas' ,
            descricao: 'A young guy who makes success with gatinhas'
        },
        idade: 22,
        skills: ['Javascript', 'Python', 'Node.js', 'Express', 'Java']
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        me: {
            name: 'Marcos Lucas' ,
            descricao: 'A young guy who makes success with gatinhas'
        },
        qa: 'Do you have any questions?',
        forum: 'click here to access the forum',
        support: 'Our employees will help you asap'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        me: {
            name: 'Marcos Lucas' ,
            descricao: 'A young guy who makes success with gatinhas'
    },
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        me: {
            name: 'Marcos Lucas' ,
            descricao: 'A young guy who makes success with gatinhas'
    },
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Server is up on port 3000")
})