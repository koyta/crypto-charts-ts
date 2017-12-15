import {action, computed, observable, runInAction} from 'mobx';
import * as helpers from '../utils/gettingData';
import * as chartjs from 'chart.js';
import {ChartData} from 'react-chartjs-2';

class ChartStore {
    @observable data: ChartData<chartjs.ChartData> = {
        datasets: [
            {
                data: [100,200,300,512,643,375,385]
            }
        ],
        labels: [
            'initial label'
        ],
    };

    @observable cData = {
        datasets: [
            {
                data: [1, 2, 1, 4, 2, 6, 1, 8, 2, 10],
            }
        ],
        labels: [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
        ]
    };

    @observable state: 'pending' | 'done' | 'error' = 'pending'; //'pending' / 'done' / 'error'

    @computed get report() {
        return this.cData.datasets[0].data;
    }

    @action
    async fetch() {
        this.state = 'pending';
        try {
            const data = await helpers.getDataAboutCrypto('BTC', 'RUB');
            // const numbers = [1,2,3,4,5];
            runInAction('logging fetched data', () => {
                console.log(`fetched data: ${JSON.stringify(data, null, '\t')}`);
                this.cData.datasets[0].data = data.averages.day;
                this.state = 'done';
            });
        } catch {
            runInAction(() => {
                this.state = 'error';
            });
        }
    }

    @action
    async historicalFetch(crypto: string, currency: string, period: 'daily'|'monthly'|'alltime'|number) {
        this.state = 'pending';
        try {
            const data = await helpers.getHistoricalDataAboutCrypto('BTC', 'USD', 'daily');
            runInAction('Update state after fetch', () => {
                const slicedData = data.slice(0, 25);
                slicedData.slice().forEach((item:any, i:number) => {
                    this.cData.datasets[0].data[i] = item.average;
                    this.cData.labels[i] = item.time;
                });
                this.state = 'done';
            });
        } catch {
            runInAction('Catch error', () => {
                this.state = 'error';
                throw (Error('Что-то пошло не так в получении данных (historicalFetch в ChartStore)'));
            });

        }
    }

    // static fromJS(cData: ChartDataSets[], cTitles: Array<string | string[]>) {
    //     return new ChartModel(cData, cTitles);
    // }
}

export default new ChartStore();