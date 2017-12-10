const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const app = express()

//Parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

//Set Port
const port = process.env.PORT || '3000'
app.set('port', port)

const server = http.createServer(app);

server.listen(port, ()=>console.log(`Running on localhost:${port}`)) 