import {ChartComponentProps, ChartData} from 'react-chartjs-2';
import {IObservableFactory, IObservableObject} from "mobx";
import * as chartjs from "chart.js";

interface IMenuInterface {
  User?: any
}

interface IMainContainerProps {
    pageHeading?: string;
    onButtonClick?(event: object): void
    onHistoricalBtnClick?(event: object): void
    ChartStore?: any
}

interface IMainComponentProps {
    pageHeading?: string;
    onButtonClick?(event: object): void
    onHistoricalBtnClick?(event: object): void
    ChartStore?: any
}

interface IChartContainerProps {
    ChartStore?: any;
}

interface IChartComponentProps {
    chartData: chartjs.ChartData;
}

interface IFetchedAverageData {
    readonly average: number;
    readonly time: string;
}