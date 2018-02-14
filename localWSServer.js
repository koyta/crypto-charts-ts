const WebSocket = require('ws')
const {
    axiosBA,
    publicKey
} = require('./axios');

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

    /**
     * Constructing a server
     * @param {number} port 
     */
    constructor(port) {

        this.resultData = {};

        this.wsServer = new WebSocket.Server({
            port: port
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
        }

        this.unsubscriptionMessage = {
            "event": "message",
            "data": {
                "operation": "unsubscribe",
                "options": {
                    "currency": "BTCUSD",
                    "symbol_set": "global"
                }
            }
        }

        this.wsServer.on('connection', function connection(incomingWS) {
            console.log('LOG: New WebSocket connection.');
        })

        this.wsServer.on('close', function close(error) {
            console.log(`LOG: WebSocket closed. ${error.code} ${error.reason}`);
            this.unsubscribe();
        })

        this.wsServer.on('message', function message(msg) {
            console.log(`MESSAGE: ${msg}`);
        })

        this.wsServer.on('error', (error) => {
            console.error('ERROR: ', error.code + error.message)
        })
    }

    /**
     * Subscribe function is used for create a new Websocket connection with Bitcoin Average
     * @param {string} crypto cryptocurrency (BTC, ETH, etc.)
     * @param {string} currency currency (USD, EUR, etc.)
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
                this.wsBA.send(JSON.stringify(this.subscriptionMessage));
            };

            /**
             * Callback function for incoming message from Bitcoin Average websocket connection
             */
            this.wsBA.onmessage = event => {
                const {
                    data
                } = event;
                console.log(data);
                this.resultData = data;
                // Sending data to all of local websocket server clients
                this.wsServer.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(data);
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
    }

    updateSubscriptionMessage(crypto, currency) {
        this.subscriptionMessage.data.options.currency = `${crypto}${currency}`
        this.unsubscriptionMessage.data.operation.currency = `${crypto}${currency}`
    }
}

module.exports = localWebSocketServer