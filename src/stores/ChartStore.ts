import { action, computed, observable, runInAction, toJS } from 'mobx';
import * as helpers from '../utils/gettingData';
import * as chartjs from 'chart.js';
import { FetchedAverageData } from '../interfaces';

type ActionState = 'pending' | 'done' | 'error';

class ChartStore {

    @observable chartType: chartjs.ChartType;
    @observable cData: chartjs.ChartData;
    @observable state: ActionState; // 'pending' / 'done' / 'error'

  rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    this.state = 'pending';
    this.chartType = 'line';
    this.cData = {
      datasets: [
        {
          data: [3, 2, 1, 4, 2, 5, 1, 8, 7, 10],
          label: 'Default chart',
          fill: true
        }
      ],
      labels: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
      ]
    };
  }

  /**
   * Устанавливает выбрнные тип графика. График рендерится заново, структура данных должна немного поменяться.
   * @param {Chart.ChartType} type
   */
  @action setChartType(type: chartjs.ChartType) {
    this.chartType = type;
    console.log('Тип графика теперь ', this.chartType);
  }

  /**
   * Возвращает текущее состояние данных графика
   * @returns {string | object}
   */
  @computed get report(): string | object {
        if (this.cData.datasets[0] !== undefined) {
            return toJS(this.cData.datasets[0].data);
        } else {
            return 'cData is empty';
        }
    }

  /**
   * Асинхронно забирает данные с сервера bitcoinaverage.com через их API по заданным параметрам.
   * Возвращает все данные об определенной криптовалюте в заданной валюте
   * @param {string} crypto
   * @param {string} currency
   * @param {string[]} parameters
   * @returns {Promise<void>}
   */
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
                throw (Error('Не получилось получить данные (fetch в ChartStore). Проверьте подключение к интернету.'));
            });
        }
    }

  /**
   * Асинхронно забирает исторические данные с сервера bitcoinaverage.com через их API.
   * Возвращает исторические данные об определенной криптовалюте в заданной валюте за заданный исторический промежуток
   * @param {string} crypto
   * @param {string} currency
   * @param {"daily" | "monthly" | "alltime" | number} period
   * @returns {Promise<void>}
   */
    @action
    async historicalFetch(crypto: string, currency: string, period: 'daily'|'monthly'|'alltime'|number) {
        this.state = 'pending';
        try {
            const data = await helpers.getHistoricalDataAboutCrypto('BTC', this.rootStore.UserStore._currency, 'alltime');
            runInAction('Update state after fetch', () => {
                // Обрезаем загруженные данные до того количества, которое хотим увидеть на графике и переворачиваем для удобства просмотра
                let numberOfResults = this.rootStore.UserStore.numberOfResults;
                let slicedData = data.slice(0, numberOfResults).reverse();
                // Удаляем старые данные
                this.cData.datasets[0].data.splice(0, this.cData.datasets[0].data.length);
                this.cData.datasets[0].data = [];
                this.cData.labels.splice(0, this.cData.labels.length);
                // Добавляем загруженные данные на график
                slicedData.slice().forEach( (item: FetchedAverageData, i: number) => {
                    this.cData.datasets[0].data[i] = item.average;
                    // Оставляем только дату в строке
                    this.cData.labels[i] = item.time.slice(0, 10);
                });
                this.cData.datasets[0].label = 'Bitcoin';
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

export default ChartStore;