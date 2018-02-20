const express = require('express')
const cors = require('cors')
const path = require('path')
const WebsocketServer = require('./websocketServer')

const app = express()
const port = process.env.PORT || 5000
const WSS = new WebsocketServer(8080)

app.use(cors())

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  )
  res.setHeader("Cache-Control", "no-cache")
  next()
});

app.use(express.static(path.join(__dirname, "client/build")))

app.post('/wss/connect', cors(), function (req, res, next) {
  WSS.subscribe('BTC', 'RUB')
  res.sendStatus(200)
})

app.get('/wss/close', function (req, res, next) {
  WSS.unsubscribe()
  res.sendStatus(200)
})

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

app.listen(port, () => console.log(`Listening on port ${port}`)) //listening on 5000
