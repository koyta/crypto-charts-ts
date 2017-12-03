import * as React from 'react';
import Chart from '../../containers/Chart';
import {IMainProps} from '../../interfaces';

class Main extends React.Component<IMainProps> {

    constructor(props: IMainProps) {
        super(props);
    }

    render() {

        return (
            <main>
                <div className="container">
                    <header>
                        <h1>Bitcoin</h1>
                    </header>
                    <Chart chartData={{}}/>
                </div>
            </main>
        );
    }
}

export default Main;