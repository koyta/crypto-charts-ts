import * as React from 'react';
import Chart from '../../components/Chart';
// import {IChartProps, IChartState} from '../../interfaces';
import * as Charts from 'react-chartjs-2';
import { ChartContainerProps } from '../../interfaces';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

@inject('store') @observer
class ChartContainer extends React.Component<ChartContainerProps, {}> {

    render() {
        const { ChartStore } = this.props.store;

        return (
          <Chart chartData={toJS(ChartStore.cData)} type={ChartStore.chartType}/>
        );
    }
}

export default ChartContainer;