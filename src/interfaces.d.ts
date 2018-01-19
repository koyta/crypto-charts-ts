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
}

interface MainContainerProps {
  pageHeading?: string;
  store?: any;
  onButtonClick?(event: object): void;
  onHistoricalBtnClick?(event: object): void;
}

interface MainComponentProps {
  pageHeading?: string;
  store?: any;
  onButtonClick?(event: object): void;
  onHistoricalBtnClick?(event: object): void;
}

interface ChartContainerProps {
  store?: any;
}

interface ChartComponentProps {
  chartData: chartjs.ChartData;
  type: chartjs.ChartType;
}

interface FetchedAverageData {
  readonly average: number;
  readonly time: string;
}