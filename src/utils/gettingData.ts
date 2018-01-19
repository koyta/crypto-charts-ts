import { historicalUrl, tickerUrl } from './authentication';
import axios from 'axios';

const makeTickerUrl = function (cryptocurrency: string, currency?: string): string {
  return tickerUrl + '/' + cryptocurrency + currency;
};

async function getDataAboutCrypto(crypto: string, currency?: string) {
  try {
    const response = await axios.get(makeTickerUrl(crypto, currency));
    if (response.status === 200) {
      // console.dir(`getDataAboutCrypto | ${JSON.stringify(response, null, '\t')}`);
      return response.data;
    }
  } catch {
    return [-1];
  }
}

async function getHistoricalDataAboutCrypto(crypto: string,
                                            currency?: string,
                                            time?: '' | 'alltime' | 'daily' | 'monthly') {
  try {
    const response = await axios.get(
      historicalUrl + crypto + currency,
      {
        params: {
          period: time,
          format: 'json'
        }
      }
    );
    if (response.status === 200) {
      // console.dir(`getHistoricalDataAboutCrypto | ${JSON.stringify(response, null, '\t')}`);
      return response.data;
    }
  } catch {
    return [-1];
  }
}

export {
  getDataAboutCrypto, getHistoricalDataAboutCrypto
};