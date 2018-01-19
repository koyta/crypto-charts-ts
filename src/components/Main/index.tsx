import * as React from 'react';
import Chart from '../../containers/Chart';
import { MainComponentProps } from '../../interfaces';
import Devtools from 'mobx-react-devtools';

const Main = (props: MainComponentProps) => {
  return (
    <main>
      <div className="container">
        <Chart/>
        <button className="btn btn-primary" onClick={props.onHistoricalBtnClick}>get historical data</button>
      </div>
    </main>
  );
};

export default Main;