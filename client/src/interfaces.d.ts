import * as chartjs from 'chart.js';
import * as React from 'react';

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
  ChartStore: any;
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
  data: chartjs.ChartData;
  isFetching: boolean;
  testData: RealtimeData | RealtimeStatus | null;
}

interface ChartRTComponent {
  data: chartjs.ChartData;
  options: chartjs.ChartOptions;
}