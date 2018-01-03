import * as React from 'react';
import {Doughnut, Line, Pie} from 'react-chartjs-2';
import { IChartComponentProps } from '../../interfaces';

const options = {
  responsive: true,
  maintainAspectRatio: true,
}

const Chart = (props: IChartComponentProps) => {
    return (
        <div className="chart">
            <Line
                data={props.chartData}
                width={1000}
                height={500}
                redraw={false}
                options={options}
            />
        </div>
    );
};

export default Chart;