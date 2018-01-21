const express   = require('express')
const axios     = require('axios')
const crypto    = require('crypto-js')
const ba      = require('bitcoinaverage')
const WebSocket = require('ws')

const app  = express()
const port = 5000

const publicKey = 'MGVlNjY1OWI2NjUxNDAxMDg1NzA0MzUyYjlhN2YwNjc'
const secretKey = 'NWM4NDQyNTcxZDkzNGNhMWEzMWIwOTc5OTJlZjU0NWMzMTNhNmQyNWM5N2I0OTlmYjI5ODBmMzY4OWY0N2YwNw'
let timestamp   = Math.floor(Date.now() / 1000)
let payload     = timestamp + '.' + publicKey
const hash      = crypto.HmacSHA256(payload, secretKey)
const hexHash   = crypto.enc.Hex.stringify(hash)
const signature = payload + '.' + hexHash

const rootUrl       = 'https://apiv2.bitcoinaverage.com/'
const tickerUrl     = 'https://apiv2.bitcoinaverage.com/indices/global/ticker'
const historicalUrl = 'https://apiv2.bitcoinaverage.com/indices/global/history/'
const WEBSOCKET_URL = 'wss://apiv2.bitcoinaverage.com/websocket/'

let options = {
  'X-Signature': signature,
}

const axiosBA = axios.create({
  baseURL: 'https://apiv2.bitcoinaverage.com/',
  method: 'GET',
  timeout: 10000,
  headers: {'X-Signature': signature},
})

async function loadTicket () {
  const url  = 'websocket/get_ticket'
  let response = await axiosBA(`/${url}`)
  let ticket = response.data['ticket'];

  return ticket;
}

async function startConnection() {
  try {
    let ticket = await loadTicket();
    const ws = new WebSocket(`wss://apiv2.bitcoinaverage.com/websocket/ticker?ticket=${ticket}&public_key=${publicKey}`)

    let subscriptionMessage = {
      "event": "message",
      "data": {
        "operation": "subscribe",
        "options": {
          "currency": 'BTCUSD',
          "market": 'global'
        }
      }
    };

    let unubscriptionMessage = {
      "event": "message",
      "data": {
        "operation": "unsubscribe",
        "options": {
          "currency": 'BTCUSD',
          "market": 'global'
        }
      }
    };

    ws.onopen = () => {
      console.log('connection opened')
      let msg = JSON.stringify(subscriptionMessage);
      ws.send(msg);
    }

    ws.onmessage = ev => {
      console.log(ev.data)
    }

    ws.onclose = ev => {
      console.log(`closed ${ev.code}`)
      let msg = JSON.stringify(unubscriptionMessage);
      ws.send(msg);
    }
  } catch (error) {
    console.error(error);
  }
}

startConnection()

app.listen(port, () => console.log(`listening on port ${port}`))
