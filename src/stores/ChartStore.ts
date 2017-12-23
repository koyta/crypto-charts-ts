import {action, computed, observable, runInAction} from 'mobx';
import * as helpers from '../utils/gettingData';
import * as chartjs from 'chart.js';
import { ChartData } from 'react-chartjs-2';
import { FetchedAverageData } from '../interfaces';

class ChartStore {

    @observable cData: chartjs.ChartData = {
        datasets: [
            {
                data: [1, 2, 1, 4, 2, 6, 1, 8, 2, 10],
                label: 'default'
            }
        ],
        labels: [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
        ]
    };

    @observable state: 'pending' | 'done' | 'error' = 'pending'; // 'pending' / 'done' / 'error'

    @computed get report() {
        if (this.cData.datasets !== undefined) {
            return this.cData.datasets[0].data;
        } else {
            return 'cData undefined';
        }
    }

    @action
    async fetch() {
        this.state = 'pending';
        try {
            const data = await helpers.getDataAboutCrypto('BTC', 'RUB');
            // const numbers = [1,2,3,4,5];
            runInAction('logging fetched data', () => {
                if (this.cData.datasets !== undefined) {
                    console.log(`fetched data: ${JSON.stringify(data, null, '\t')}`);
                    this.cData.datasets[0].data = data.averages.day;
                    this.state = 'done';
                } else {
                    console.log('');
                    this.state = 'error';
                }
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
            const data = await helpers.getHistoricalDataAboutCrypto('BTC', 'USD', 'alltime');
            runInAction('Update state after fetch', () => {
                // Обрезаем загруженные данные до того количества, которое хотим увидеть на графике и переворачиваем для удобства просмотра
                let slicedData = data.slice(0, 25).reverse();
                // Добавляем загруженные данные на график
                slicedData.slice().forEach( (item: FetchedAverageData, i: number) => {
                    this.cData.datasets[0].data[i] = item.average;
                    
                    let time = Date.parse(item.time);
                    this.cData.labels[i] = item.time.slice(0, 10);
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