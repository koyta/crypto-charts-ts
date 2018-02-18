import { action, computed, observable, runInAction, IObservable, toJS } from 'mobx';
import * as helpers from '../utils/gettingData';
import * as chartjs from 'chart.js';
import * as I from '../interfaces';

class ChartStore implements I.ChartStoreInterface {

  options?: chartjs.ChartOptions = {
    responsive: true,
    maintainAspectRatio: true
  };

  colors: chartjs.ChartColor = [
    'rgba(126, 65, 73, 0.4)',
    'rgba(138, 92, 123, 0.4)',
    'rgba(118, 129, 167, 0.4)',
    'rgba(73, 167, 185, 0.4)',
    'rgba(69, 200, 170, 0.4)',
    'rgba(144, 225, 134, 0.4)',
    'rgba(239, 238, 105, 0.4)'
  ];
  nextColor: number = 0;

  @observable realtimeData: any;
  @observable chartType: chartjs.ChartType;
  @observable chartData: chartjs.ChartData;
  @observable _historicalPeriod: I.HistoricalPeriod;
  state: I.ActionState; // 'pending' / 'done' / 'error'

  rootStore: I.RootStore;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    this.state = 'pending';
    this.chartType = 'line';

    this.realtimeData = {
      datasets: [
        {
          data: [],
          label: 'Realtime BTC',
          fill: true
        }
      ],
      labels: []
    };

    this.chartData = {
      datasets: [
        {
          data: [],
          label: 'Chart.js',
          fill: true
        }
      ],
      labels: []
    };
    this._historicalPeriod = 'alltime';
  }

  @action updateRealtimeData(newData: I.RealtimeWebsocketData) {
    try {
      if (this.realtimeData.datasets.length > 0) {
        let updatedData = [...this.realtimeData.datasets[0].data, newData.ask];
        let updatedLabels = [...this.realtimeData.labels, newData.display_timestamp];
        this.realtimeData.datasets[0].data = updatedData;
        this.realtimeData.labels = updatedLabels;
      } else {
        throw new Error('Dataset is empty');
      }
    } catch (error) {
      console.error(error);
    }
  }

  @computed get historicalPeriod() {
    return this._historicalPeriod;
  }

  @action setHistoricalPeriod(period: I.HistoricalPeriod) {
    this._historicalPeriod = period;
  }

  /**
   * Устанавливает выбрнные тип графика. График рендерится заново, структура данных должна немного поменяться.
   * @param {Chart.ChartType} type
   */
  @action setChartType(type: chartjs.ChartType) {
    this.chartType = type;
  }

  /**
   * Asynchronously takes historical data from the server bitcoinaverage.com through their API.
   * Returns promise of historical data about a particular currency in a given currency for a given historical period
   */
  @action
  async historicalFetch(crypto: string, currency: string, period: '' | 'alltime' | 'daily' | 'monthly') {
    this.state = 'pending';
    const userStore = this.rootStore.UserStore;

    try {
      let numberOfResults = userStore.getNumResults;
      if (numberOfResults <= 0) {
        throw new RangeError('Number of requested results will be 1 or more');
      }

      /**
       * https://bitcoinaverage.com API sending like ~9k of results e.g. for Bitcoin. We can just slice the data.
       * // TODO Better if we store all 9k results and dont trying to fetch them again after changing a {userStore.getNumResults}.
       * But later. There's many crypto's.
       */
      let fetchedData = [];
      for (let i = 0; i < userStore.getCrypto.length; i++) {
        let data = await helpers.getHistoricalDataAboutCrypto(userStore.getCrypto[i], userStore._currency, this.historicalPeriod);
        fetchedData.push(data);
      }

      let slicedData: Array<any>;
      slicedData = fetchedData.map((value: any, index: number, array: any) => {
        return array[index].slice(0, numberOfResults).reverse();
      });

      this.erase();
      this.prepareDataBeforeAdd(slicedData);

      this.state = 'done';
    } catch (error) {
      runInAction('catch error', () => {
        this.state = 'error';
        console.error(`${error.type}: ${error.message}`);
      });
    }
  }

  /** 
   * Erasing chart data
   */
  @action erase() {
    this.chartData.datasets.splice(0, this.chartData.datasets.length);
    this.chartData.labels.splice(0, this.chartData.labels.length);
    this.nextColor = 0;
  }

  @action prepareDataBeforeAdd(data: Array<I.HistoryFetchedData[]>) {
    {
      data.forEach((dataItem: I.HistoryFetchedData[], index: number) => {
        let newData: number[] = dataItem.map((item: I.HistoryFetchedData) => {
          return item.average;
        });
        let newLabels: string[] = dataItem.map((item: I.HistoryFetchedData) => {
          switch (this.historicalPeriod) {
            case 'alltime':
              return item.time.slice(0, 10);
            case 'monthly' || 'daily':
              return item.time.slice(5, 16);
            default:
              return item.time;
          }
        }
        );
        let newLegend: string = this.rootStore.UserStore.getCrypto[index];
        /**
         * Pushing created data to chart dataset
         */
        this.addChartDataToDataset(newData, newLabels, newLegend);
      });
    }
  }

  /**
   *
   * @param {number[]} data
   * @param {Array<string | string[]>} labels
   * @param {string} legend
   */
  @action addChartDataToDataset(data: number[], labels: Array<string | string[]>, legend: string) {
    const newDataset: chartjs.ChartDataSets = {
      data: data,
      label: legend,
      backgroundColor: this.colors[this.nextColor],
      hoverBackgroundColor: this.colors[this.nextColor]
    };
    this.nextColor++;
    this.chartData.datasets.push(newDataset);
    this.chartData.labels = labels;
  }
}

export default ChartStore;