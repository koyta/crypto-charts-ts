import * as chartjs from 'chart.js';
import * as React from 'react';
import ChartStore from './stores/ChartStore';

declare module '*.png'; // for import images

// Fetched data interfaces
interface HistoryFetchedData {
  average: number;
  high: number;
  low: number;
  open: number;
  time: string;
  volume: number;
}

type HistoricalPeriod = 'alltime' | 'monthly' | 'daily';

interface RootStore {
  UserStore: any;
  AppStore: any;
  ChartStore: ChartStoreInterface;
}

type ActionState = 'pending' | 'done' | 'error';

interface ChartStoreInterface {
  options?: chartjs.ChartOptions;
  colors: chartjs.ChartColor;
  nextColor: number;
  realtimeData: chartjs.ChartData;
  chartType: chartjs.ChartType;
  chartData: chartjs.ChartData;
  _historicalPeriod: HistoricalPeriod;
  state: ActionState;
  rootStore: RootStore;
  updateRealtimeData(newValue: RealtimeWebsocketData): void;
  setHistoricalPeriod(period: HistoricalPeriod): void;
  setChartType(type: chartjs.ChartType): void;
  historicalFetch(crypto: string, currency: string, period: '' | 'alltime' | 'daily' | 'monthly'): Promise<any>;
  erase(): void;
  prepareDataBeforeAdd(data: Array<HistoryFetchedData[]>): void;
  addChartDataToDataset(data: number[], labels: Array<string | string[]>, legend: string): void;
}

interface AppProps {
  store?: any;
}

interface MenuContainer {
  store?: any;
  onCurrencyChange?(e: React.SyntheticEvent<HTMLInputElement>): void;
  onTypeChange?(e: React.SyntheticEvent<HTMLInputElement>): void;
  onPeriodChange?(e: React.SyntheticEvent<HTMLInputElement>): void;
}

interface MainContainerProps {
  pageHeading?: string;
  store?: any;
  onButtonClick?(event: object): void;
  onHistoricalBtnClick?(event: object): void;
  onSaveBtnClick?(event: object): void;
}

interface MainComponentProps {
  pageHeading?: string;
  store?: any;
  onButtonClick?(event: object): void;
  onHistoricalBtnClick?(event: object): void;
  onSaveBtnClick?(event: object): void;
}

interface ChartContainerProps {
  store?: any;
}

interface ChartComponentProps {
  chartData: chartjs.ChartData;
  type: chartjs.ChartType;
  options: chartjs.ChartOptions;
}

interface FetchedAverageData {
  readonly average: number;
  readonly time: string;
}

interface RealtimeData {
  data?: RealtimeWebsocketData;
  event?: string;
}

interface RealtimeStatus {
  type: string;
  data: string;
}

interface RealtimeWebsocketData {
  ask?: number;
  bid?: number;
  last?: number;
  high?: number;
  low?: number;
  event?: string;
  open?: RealtimeWebsocketDataTime;
  averages?: RealtimeWebsocketDataTime;
  volume?: number;
  volume_percent?: number;
  timestamp?: number;
  display_timestamp?: string;
  success?: boolean;
  time?: string;
}

interface RealtimeWebsocketDataTime {
  day?: number;
  week?: number;
  month?: number;
}

interface ChartRTState {
  isFetching: boolean;
}

interface ChartRTComponent {
  data: chartjs.ChartData;
  options: chartjs.ChartOptions;
  startFetching(): void;
  stopFetching(): void;
}