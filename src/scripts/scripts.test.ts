import { makeRequest } from "./gettingData";


describe('gettingData.ts', () => {
  it('making request to server', () => {
    makeRequest('BTC', 'USD').then(status => expect(status).toEqual(200))
  })
})
