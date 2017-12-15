import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { IChartComponentProps } from '../../interfaces';

const Chart = (props: IChartComponentProps) => {
    return (
        <div className="chart">
            <Line
                data={props.chartData}
                width={800}
                height={500}
                redraw={true}
            />
        </div>
    );
};

export default Chart;