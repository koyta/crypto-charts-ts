import * as React from 'react';
import Chart from '../../containers/Chart';
import { MainComponentProps } from '../../interfaces';
import Devtools from 'mobx-react-devtools';

const Main = (props: MainComponentProps) => {
  return (
    <main>
      <div className="container">
        <Chart/>
        <div className="btn-set">
          <button className="btn btn-primary" onClick={props.onHistoricalBtnClick}>get historical data</button>
          <a className="btn btn-save" href="#" onClick={props.onSaveBtnClick} download="crypto-charts.png">save</a>
        </div>
      </div>
    </main>
  );
};

export default Main;