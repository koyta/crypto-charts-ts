import * as React from 'react';
import { ChartContainerProps } from '../../interfaces';

interface ChartRTComponent {
  store?: any;
  data: number;
}

const ChartRT = (props: ChartRTComponent) => {
  return (
    <div>
      {props.data}
    </div>
  );
};

export default ChartRT;