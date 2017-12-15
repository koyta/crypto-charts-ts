import {observable} from 'mobx';
import {ChartData, ChartDataSets} from 'chart.js';

export default class ChartModel {
    @observable data: ChartData;

    constructor(datasets: ChartDataSets[], labels: Array<string | string[]>) {
        this.data['datasets'] = datasets;
    }
}