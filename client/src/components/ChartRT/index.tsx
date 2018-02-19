import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartRTComponent } from '../../interfaces';

const ChartRT = ({ data, options, ...props }: ChartRTComponent) => {
  return (
    <div className="content-wrapper">
      <div className="chart-wrapper">
        <Line
          data={data}
          options={options}
        />
      </div>
      <p className="status">{props.status}</p>
      <div className="btn-set">
        <button disabled={props.isFetching} className="btn btn-primary" onClick={() => props.startFetching()}>Start fetching</button>
        <button disabled={!props.isFetching} className="btn btn-danger" onClick={() => props.stopFetching()}>Stop fetching</button>
      </div>
    </div>
  );
};

export default ChartRT;