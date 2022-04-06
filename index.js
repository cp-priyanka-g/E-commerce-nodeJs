const express = require('express')
const dotenv=require('dotenv')
dotenv.config({path:'.env'})
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => {
   res.send('CRUD Application')
 })