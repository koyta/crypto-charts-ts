import * as React from 'react';
// import Table from '../../containers/Table';
import Chart from '../../containers/Chart';
import * as helpers from '../../scripts/gettingData';

class Main extends React.Component<IMainProps> {

  constructor(props: IMainProps) {
    super(props);
  }

  render () {
    return (
      <main>
        <div className="container">
          <header>
            <h1>Bitcoin</h1>
          </header>
          {/*<Table />*/}
          <Chart data={helpers.getDataOverDays(20)} />
        </div>
      </main>
    );
  }
};

export default Main;