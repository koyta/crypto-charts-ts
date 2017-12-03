import * as React from 'react';
import { Line } from 'react-chartjs-2';
import {IChartProps} from '../../interfaces';
// import { ChartData } from 'chart.js';

// const chartData: ChartData = {
//     datasets: [
//         {
//             data: [5, 6, 7, 8, 9, 10]
//         }
//     ]
// };

const Chart = (props: IChartProps) => {
    return (
        <div className="chart">
            <Line
                data={props.chartData}
                width={800}
                height={350}
                redraw={true}
            />
        </div>
    );
};

export default Chart;