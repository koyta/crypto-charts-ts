import * as React from 'react';
import Chart from '../../components/Chart';
// import {IChartProps, IChartState} from '../../interfaces';
import * as Charts from 'react-chartjs-2';
import {IChartContainerProps} from '../../interfaces';
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';

@inject('ChartStore') @observer
class ChartContainer extends React.Component<IChartContainerProps, {}> {

    render() {
        const { ChartStore } = this.props;
        return (
            <div className="chart">
                <Chart chartData={toJS(ChartStore.cData)}/>
            </div>
        );
    }
}

export default ChartContainer;