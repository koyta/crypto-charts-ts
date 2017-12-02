import * as React from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends React.Component<IChartProps, {}> {

  constructor(props: IChartProps) {
    super(props);
  }

  public render() {
    return (
      <div className="chart">
        <Line
          data={this.props.data}
          width={800}
          height={350}
          redraw={true}
        />
      </div>
    );
  }

}

export default Chart;