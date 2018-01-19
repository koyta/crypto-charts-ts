import { action, observable, runInAction } from 'mobx';
import * as helpers from '../utils/gettingData';
import * as chartjs from 'chart.js';
import { HistoryFetchedData, RootStore } from '../interfaces';
import { ChartDataSets } from 'chart.js';

type ActionState = 'pending' | 'done' | 'error';

class ChartStore {

  colors: chartjs.ChartColor = [
    'rgba(189, 185, 52, 0.2)',
    'rgba(41, 149, 48, 0.2)',
    'rgba(189, 55, 52, 0.2)',
    'rgba(90, 41, 127, 0.2)'
  ];
  nextColor: number = 0;

  @observable chartType: chartjs.ChartType;
  @observable cData: chartjs.ChartData;
  @observable state: ActionState; // 'pending' / 'done' / 'error'

  protected rootStore: RootStore;

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
   * @param {string} crypto - криптовалюта
   * @param {string} currency - валюта
   * @param {"daily" | "monthly" | "alltime" | number} period - период, за который получаем данные
   * @returns {Promise<void>}
   */
  @action
  async historicalFetch(crypto: string, currency: string, period: '' | 'alltime' | 'daily' | 'monthly') {
    this.state = 'pending';
    try {
      const UserStore = this.rootStore.UserStore;
      let fetchedData = [];

      for (let i = 0; i < UserStore.getCrypto.length; i++) {
        fetchedData.push(await helpers.getHistoricalDataAboutCrypto(UserStore.getCrypto[i], UserStore._currency, 'alltime'));
        console.log(`ChartStore| Loading data for crypto: ${UserStore._crypto[i]}.`);
      }

      // Обрезаем загруженные данные до того количества, которое хотим увидеть на графике и переворачиваем для удобства просмотра
      let numberOfResults = this.rootStore.UserStore.getNumResults;
      if (numberOfResults <= 1) {
        throw new RangeError('Number of checked currencies will be 1 or more');
      }
      let slicedData: Array<any>;
      slicedData = fetchedData.map((value: void, index: number, array: any) => {
        return array[index].slice(0, numberOfResults).reverse();
      });
      console.log(slicedData);

      runInAction('Erasing old chart data', () => {
          this.cData.datasets.splice(0, this.cData.datasets.length);
          this.cData.labels.splice(0, this.cData.labels.length);
      });

      runInAction('Add new data to chart', () => {
        slicedData.forEach((data: HistoryFetchedData[], index: number) => {
          let newData: number[] = data.map((item: HistoryFetchedData) => {
            return item.average;
          });
          let newLabels: string[] = data.map((item: HistoryFetchedData) => {
            return item.time.slice(0, 10);
          });
          let newLegend: string = this.rootStore.UserStore.getCrypto[index];

          this.addChartDataToDataset(newData, newLabels, newLegend);
        });
      });
      this.state = 'done';

    } catch (err) {
      runInAction('Catch error', () => {
        this.state = 'error';
        console.log(err);
      });
    }
  }

  @action addChartDataToDataset(data: number[], labels: Array<string | string[]>, legend: string) {
    const newDataset: chartjs.ChartDataSets = {
      data: data,
      label: legend,
      backgroundColor: this.colors[this.nextColor++]
    };
    console.log(newDataset.backgroundColor);
    this.cData.datasets.push(newDataset);
    this.cData.labels = labels;
  }
}

export default ChartStore;