## Crypto currency charts
### Requirements:
- Installed NodeJS
- Installed npm
### How to run
First you need to install dependencies: `npm install`
After that, run application: `npm run dev`
Realtime still buggy when closing connection

Express.js is needed to create a simple API through which the client will start / stop receiving data from an external source. The data is received using a local WebSocket server, which in turn receives data from an external source and sends it to the connected clients. Otherwise, the source does not allow you to directly obtain the authorization key (token)