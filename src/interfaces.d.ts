import {ChartComponentProps, ChartData} from 'react-chartjs-2';

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
    ChartStore?: any
}

interface IChartComponentProps {
    chartData: any;
}