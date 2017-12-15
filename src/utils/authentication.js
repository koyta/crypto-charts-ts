const crypto = require('crypto-js');

// Constructing signature
const publicKey = 'MGVlNjY1OWI2NjUxNDAxMDg1NzA0MzUyYjlhN2YwNjc';
const secretKey = 'NWM4NDQyNTcxZDkzNGNhMWEzMWIwOTc5OTJlZjU0NWMzMTNhNmQyNWM5N2I0OTlmYjI5ODBmMzY4OWY0N2YwNw';
let timestamp = Math.floor(Date.now() / 1000);
let payload = timestamp + '.' + publicKey;
const hash = crypto.HmacSHA256(payload, secretKey);
const hexHash = crypto.enc.Hex.stringify(hash);
const signature = payload + '.' + hexHash;

// Exports
const tickerUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker';
const historicalUrl = 'https://apiv2.bitcoinaverage.com/indices/global/history/';
let options = {
    'X-signature-id': signature
};

export {
    tickerUrl, historicalUrl, options
};