import * as React from 'react';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import { ChartComponentProps } from '../../interfaces';

const options = {
  responsive: true,
  maintainAspectRatio: true,
};

class Chart extends React.Component<ChartComponentProps, {}> {
  render() {
    switch (this.props.type) {
      case 'line': return <Line data={this.props.chartData} redraw={false} options={options} />;
      case 'pie': return <Pie data={this.props.chartData} redraw={false} options={options} />;
      case 'bar': return <Bar data={this.props.chartData} redraw={false} options={options} />;
      case 'doughnut': return <Doughnut data={this.props.chartData} redraw={false} options={options} />;
      default: return <Line data={this.props.chartData} redraw={false} options={options} />;
    }
  }
}

export default Chart;