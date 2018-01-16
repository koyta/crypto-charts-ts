import { observable } from 'mobx';
import { ChartData } from 'chart.js';

export default class PieChartModel {
  @observable data: ChartData;

  constructor(datasets: ChartData, labels: Array<string | string[]>) {
    this.data = datasets;
  }
}