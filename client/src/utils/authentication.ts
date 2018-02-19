const crypto = require('crypto-js');
const axios = require('axios');

export const publicKey = 'MGVlNjY1OWI2NjUxNDAxMDg1NzA0MzUyYjlhN2YwNjc';
export const secretKey = 'NWM4NDQyNTcxZDkzNGNhMWEzMWIwOTc5OTJlZjU0NWMzMTNhNmQyNWM5N2I0OTlmYjI5ODBmMzY4OWY0N2YwNw';

let timestamp = Math.floor(Date.now() / 1000);
let payload = timestamp + '.' + publicKey;
const hash = crypto.HmacSHA256(payload, secretKey);
const hexHash = crypto.enc.Hex.stringify(hash);
const signature = payload + '.' + hexHash;

// Exports
const tickerUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker';
const historicalUrl = 'https://apiv2.bitcoinaverage.com/indices/global/history/';

let options = {
  'X-Signature': signature,
};

const axiosBA = axios.create({
  baseURL: 'https://apiv2.bitcoinaverage.com/',
  method: 'GET',
  timeout: 10000,
  headers: { 'X-Signature': signature },
});

export {
  tickerUrl, historicalUrl, options
};