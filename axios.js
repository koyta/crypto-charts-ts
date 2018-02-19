const axios = require('axios')
const crypto = require('crypto-js')

/**
 * Making the signature for request
 * @const publicKey - you should get it in BitcoinAverage.com for yourself (*)
 * @const secretKey - you should get it in BitcoinAverage.com for yourself (*)
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
  timeout: 0,
  headers: {
    'X-Signature': signature,
  },
})

module.exports = {
    axiosBA,
    publicKey
}