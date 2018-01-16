import * as React from 'react';
import Chart from '../../containers/Chart';
import { MainComponentProps } from '../../interfaces';
import Devtools from 'mobx-react-devtools';

const Main = (props: MainComponentProps) => {
  return (
    <main>
      <Devtools />
      <div className="container">
        <header>
          <h1>{props.pageHeading}</h1>
        </header>
        <Chart/>
        <button className="btn btn-primary" onClick={props.onButtonClick}>get info about <b>BTC</b> in <b>USD</b>
        </button>
        <button className="btn btn-primary" onClick={props.onHistoricalBtnClick}>get historical data</button>
      </div>
    </main>
  );
};

export default Main;