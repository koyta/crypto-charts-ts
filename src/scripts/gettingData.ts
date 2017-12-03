import { options, tickerUrl } from './authentication';
import axios from 'axios';

const makeRequestUrl = function (crypto: string, currency: string): string {
    return tickerUrl + crypto + currency;
};

const makeRequest = function (crypto: string, currency: string) {
    return axios.get(makeRequestUrl(crypto, currency), options)
        .then(onfullfiled => Promise.resolve(onfullfiled))
        .catch(onrejected => console.error(onrejected));
};

const getDataOverDaysRequest = function(days: number) {
    let url = 'https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=alltime&?format=json';
    return axios.get(url)
        .then(value => Promise.resolve(value.data.slice(0, days)))
        .catch(error => Promise.reject(error));
};

async function getDataOverDays(days: number) {
    try {
        const data = await getDataOverDaysRequest(days);
        getValue(data);
    } catch (e) {
        console.error(e);
    }
}

function getValue(value: object) {
    console.log(value);
    return value;
}

export {
    makeRequest, getDataOverDays, getValue
};