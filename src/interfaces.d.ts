import { ChartData } from 'chart.js';

interface IMainProps {
    title?: string;
}

interface IChartProps {
    chartData: ChartData;
}

interface IChartState {
    chartData: ChartData;
}