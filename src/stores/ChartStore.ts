import {action, computed, observable, runInAction, toJS} from 'mobx';
import * as helpers from '../utils/gettingData';
import * as chartjs from 'chart.js';
import { ChartData } from 'react-chartjs-2';
import { IFetchedAverageData } from '../interfaces';

type ActionState = 'pending' | 'done' | 'error'

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

    @observable state: ActionState = 'pending'; // 'pending' / 'done' / 'error'

    get report() {
        if (this.cData.datasets !== undefined) {
            return toJS(this.cData.datasets[0].data)
        } else {
            return 'cData is empty';
        }
    }

    @action
    async fetch(crypto: string, currency: string, parameters: string[]) {
        this.state = 'pending';
        try {
            const data = await helpers.getDataAboutCrypto(crypto, currency);
            // const numbers = [1,2,3,4,5];
            runInAction('logging fetched data', () => {
                console.log(this.report);
                // console.log(`fetched data: ${JSON.stringify(data, null, '\t')}`);
                parameters.forEach((value, index) => {
                    console.log(`${value}: ${data[value]}`);
                });
                this.cData.datasets[0].data[0] = data.averages.day;
                this.state = 'done';
            });
        } catch {
            runInAction(() => {
                this.state = 'error';
                throw (Error('Не получилось получить данные (fetch в ChartStore)'));
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
                slicedData.slice().forEach( (item: IFetchedAverageData, i: number) => {
                    this.cData.datasets[0].data[i] = item.average;
                    // Оставляем только дату в строке
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
}

export default new ChartStore();