const express = require('express')
const cors = require('cors')
const WebsocketServer = require('./websocketServer')

const app = express()
const port = process.env.PORT || 5000;
const WSS = new WebsocketServer(8080);

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post('/wss/connect', cors(), function (req, res, next) {
  WSS.subscribe('BTC', 'RUB');
  res.sendStatus(200);
})

app.get('/wss/close', function (req, res, next) {
  WSS.unsubscribe();
  res.sendStatus(200);
})

app.get('/', (req, res) => {
  res.sendStatus(200);
})

app.listen(port, () => console.log(`Listening on port ${port}`)) //listening on 5000
