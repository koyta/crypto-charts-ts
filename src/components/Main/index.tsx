import * as React from 'react';
import Chart from '../../containers/Chart';
import {IMainComponentProps} from '../../interfaces';
import Checkbox from "./Checkbox";

const Main = (props: IMainComponentProps) => {
  return (
    <main>
      <div className="container">
        <header>
          <h1>{props.pageHeading}</h1>
        </header>
        <Chart/>
        <button className="btn btn-primary" onClick={props.onButtonClick}>get info about <b>BTC</b> in <b>USD</b>
        </button>
        <button className="btn btn-primary" onClick={props.onHistoricalBtnClick}>get historical data</button>
        <Checkbox name={"BTC"}/>
        <Checkbox name={"BCH"}/>
        <Checkbox name={"LTC"}/>
        <Checkbox name={"ETH"}/>
      </div>
    </main>
  );
};

export default Main;