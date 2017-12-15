import * as React from 'react';
import Chart from '../../containers/Chart';
import {IMainComponentProps} from '../../interfaces';

const Main = (props: IMainComponentProps) => {
    return (
        <main>
            <div className="container">
                <header>
                    <h1>{props.pageHeading}</h1>
                </header>
                <Chart/>
                <button className="btn btn-primary" onClick={props.onButtonClick}>get info about <b>BTC</b> in <b>USD</b></button>
                <button className="btn btn-primary" onClick={props.onHistoricalBtnClick}>get historical data</button>
            </div>
        </main>
    );
};

export default Main;