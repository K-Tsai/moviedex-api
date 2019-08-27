require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
let movieSet = require('./Movie-Dataset')

const app = express()

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))

function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  next()
}

function handleGetGenre(req, res) {
		let userGenre = req.query.genre
		if(userGenre) {
			return movieSet.filter(movie => movie.genre.toLowerCase().includes(req.query.genre.toLowerCase()));
		} else {
			return movieSet
		}
}

function handleGetCountry( req, res, moviefilter) {
    let userCountry = req.query.country
    if (userCountry) {
        return moviefilter.filter(movie => movie.country.toLowerCase().includes(req.query.country.toLowerCase()))
    } else { 
        return moviefilter
    }
}

function handleGetAverage(req, res, avgfilter) {
	let userAvg= req.query.avg_vote
	if (userAvg) {
		return avgfilter.filter(avg => avg.avg_vote >= Number(userAvg))
	} else {
		return avgfilter
	}
}

app.get('/movie', validateBearerToken, (req, res) => {
    let movieFilter = handleGetGenre(req, res)
		let countryMovieFilter= handleGetCountry(req, res, movieFilter)
		let avgFilter= handleGetAverage(req, res, countryMovieFilter)
    res.json(avgFilter)
})

app.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})