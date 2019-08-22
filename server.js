require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))


const validTypes = [`Animation`, `Drama`, `Romantic`, `Comedy`, `Spy`, `Crime`, `Thriller`, `Adventure`, `Documentary`, `Horror`, `Action`, `Western`, `History`, `Biography`, `Musical`, `Fantasy`, `War`, `Grotesque`]

function handleGetGenre(req, res) {
    res.json(validTypes)
}

function handleGetCountry( req, res) {
    res.send("Hello, Country!")
}

app.get()

app.get('/movie', handleGetGenre, handleGetCountry)

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})