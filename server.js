const express = require('express')
const axios = require('axios')
const crypto = require('crypto-js')
const WebSocket = require('ws')

const app = express()
const port = 5000

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

/*
const rootUrl       = 'https://apiv2.bitcoinaverage.com/'
const tickerUrl     = 'https://apiv2.bitcoinaverage.com/indices/global/ticker'
const historicalUrl = 'https://apiv2.bitcoinaverage.com/indices/global/history/'
const WEBSOCKET_URL = 'wss://apiv2.bitcoinaverage.com/websocket/'
*/

/**
 * Making the signature for request
 * @var publicKey - you should get it in BitcoinAverage.com for yourself (*)
 * @var secretKey - you should get it in BitcoinAverage.com for yourself (*)
 * (*) but this time you can use my account keys
 */
const publicKey = 'MGVlNjY1OWI2NjUxNDAxMDg1NzA0MzUyYjlhN2YwNjc'
const secretKey = 'NWM4NDQyNTcxZDkzNGNhMWEzMWIwOTc5OTJlZjU0NWMzMTNhNmQyNWM5N2I0OTlmYjI5ODBmMzY4OWY0N2YwNw'
let timestamp = Math.floor(Date.now() / 1000)
let payload = timestamp + '.' + publicKey
const hash = crypto.HmacSHA256(payload, secretKey)
const hexHash = crypto.enc.Hex.stringify(hash)
const signature = payload + '.' + hexHash

/** 
 * Custom axios instance with custom header
 */
const axiosBA = axios.create({
  baseURL: 'https://apiv2.bitcoinaverage.com/',
  method: 'GET',
  timeout: 10000,
  headers: {
    'X-Signature': signature,
  },
})

class localWebSocketServer {

  /**
   * Function for request a ticket to authorize a connection
   */
  async loadTicket() {
    const url = 'websocket/get_ticket'
    let response = await axiosBA(`/${url}`)
    let ticket = response.data['ticket']
    console.log(`loadTicket: ${ticket}`);
    return ticket
  }

  constructor() {

    this.resultData = {};

    this.wsServer = new WebSocket.Server({
      port: 8080
    });

    this.wsBA = undefined;

    this.subscriptionMessage = {
      "event": "message",
      "data": {
        "operation": "subscribe",
        "options": {
          "currency": "BTCUSD",
          "symbol_set": "global"
        }
      }
    };

    this.unsubscriptionMessage = {
      "event": "message",
      "data": {
        "operation": "unsubscribe",
        "options": {
          "currency": "BTCUSD",
          "symbol_set": "global"
        }
      }
    };

    this.wsServer.on('connection', function connection(incomingWS) {
      console.log('connected');
    });

    this.wsServer.on('close', function close() {
      console.log(`Websocket closed`);
    });
  }

  /**
   * Subscribe function is used for create a new Websocket connection with Bitcoin Average
   * @param {string} crypto - cryptocurrency (BTC, ETH, etc.)
   * @param {string} currency - currency (USD, EUR, etc.)
   */
  async subscribe(crypto, currency) {
    try {
      this.ticket = await this.loadTicket();
      this.wsBA = new WebSocket(`wss://apiv2.bitcoinaverage.com/websocket/ticker?ticket=${this.ticket}&public_key=${publicKey}`);

      /**
       * Callback function calls on open Bitcoing Average websocket connection
       */
      this.wsBA.onopen = () => {
        console.log('connection with BA is opened');
        this.wsBA.send(JSON.stringify(this.subscribtionMessage));
      };

      /**
       * Callback function for incoming message from Bitcoin Average websocket connection
       */
      this.wsBA.onmessage = event => {
        const { data } = event;
        console.log(data);
        this.resultData = data;
        // Sending data to all of local websocket server clients
        this.wsServer.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            // client.send(data);
            console.log(data);
          };
        });
      };

      /**
       * On closing websocket connection with BitcoinAverage API
       */
      this.wsBA.onclose = event => {
        console.log(`Websocket connection closed with ${event.code} code`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Stop the data stream by websockets (sending unsubscribe message)
   * Closing connection to BitcoinAverage
   * @param {string} crypto 
   * @param {string} currency 
   */
  unsubscribe(crypto, currency) {
    this.wsBA.send(JSON.stringify(this.unsubscriptionMessage));
    this.wsBA.close(1000);
  }

  updateSubscriptionMessage(crypto, currency) {
    this.subscriptionMessage.data.options.currency = `${crypto}${currency}`
    this.unsubscriptionMessage.data.operation.currency = `${crypto}${currency}`
  }
}

const localWSS = new localWebSocketServer();

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