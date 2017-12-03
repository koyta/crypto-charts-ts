import * as React from 'react';
import Chart from '../../components/Chart';
import {IChartProps, IChartState} from '../../interfaces';

class ChartContainer extends React.Component<IChartProps, IChartState> {

    constructor(props: IChartProps) {
        super(props);
        this.state = {
            chartData: {}
        };
    }

    componentDidMount() {
        this.setState({
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'Jule', 'June'],
                datasets: [
                    {
                        data: [100,25,23,5,61,21,75]
                    }
                ]
            }
        });
    }

    render() {
        return (
            <Chart chartData={this.state.chartData}/>
        );
    }
}

export default ChartContainer;