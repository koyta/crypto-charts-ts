import { options, tickerUrl } from './authentication';
import axios, { AxiosPromise } from 'axios';

function averageOverTime(days: number): AxiosPromise {
    return axios.get('https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?format=json');
}

function makeRequestUrl(crypto: string, currency: string): string {
    const result = tickerUrl + crypto + currency;
    return result;
}

export function makeRequest(crypto: string, currency: string) {

    axios.get(makeRequestUrl(crypto, currency), options)
        .then( onfullfiled => { console.log(onfullfiled.data); })
        .catch( reason => {console.error(reason); });
    
}

export const getDataOverDays = (days: number) => {
    return averageOverTime(days)
        .then((data) => {
            return data.data;
        });
};

export const testApiRoot: string = 'https://jsonplaceholder.typicode.com';

console.log(averageOverTime(30));