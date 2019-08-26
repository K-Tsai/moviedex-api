require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
let movieSet = require('./Movie-Dataset')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))


const validTypes = [`Animation`, `Drama`, `Romantic`, `Comedy`, `Spy`, `Crime`, `Thriller`, `Adventure`, `Documentary`, `Horror`, `Action`, `Western`, `History`, `Biography`, `Musical`, `Fantasy`, `War`, `Grotesque`]

//app.use(function validateBearerToken(req, res, next) {
   // console.log('validate bearer token middleware')
   // next()
//})

function handleGetGenre(req, res) {
    let userGenre = req.query.genre
    return movieSet.filter(movie => movie.genre == userGenre);
}

function handleGetCountry( req, res, moviefilter) {
    let userCountry = req.query.country
    return moviefilter.filter(movie => movie.country == userCountry)
}



app.get('/movie', (req, res) => {
    let movieFilter = handleGetGenre(req, res)
    let countryMovieFilter= handleGetCountry(req, res, movieFilter)
    res.json(countryMovieFilter)
})



const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})