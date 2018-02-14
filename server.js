const express = require('express')
const localWebSocketServer = require('./localWSServer')

const app = express()
const port = 5000

const localWSS = new localWebSocketServer(8080);

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.post('/wss/connect', function (req, res) {
  res.send(`res: ${res.body}`);
  localWSS.subscribe(res.crypto, res.currency);
  res.json({
    OK: 1
  });
})

app.post('/wss/close', function (req, res) {
  localWSS.unsubscribe();
  res.json({
    OK: 2
  });
})

app.listen(port, () => console.log(`Listening on port ${port}`)) //listening on 5000