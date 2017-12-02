const crypto = require('crypto-js');

const publicKey = 'MGVlNjY1OWI2NjUxNDAxMDg1NzA0MzUyYjlhN2YwNjc';
const secretKey = 'NWM4NDQyNTcxZDkzNGNhMWEzMWIwOTc5OTJlZjU0NWMzMTNhNmQyNWM5N2I0OTlmYjI5ODBmMzY4OWY0N2YwNw';
let timestamp = Math.floor(Date.now() / 1000);
let payload = timestamp + '.' + publicKey;
const hash = crypto.HmacSHA256(payload, secretKey);
const hexHash = crypto.enc.Hex.stringify(hash);
const signature = payload + '.' + hexHash;
export const tickerUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';

export let options = {
  headers: {
    'X-session-id': signature,
  }
};
