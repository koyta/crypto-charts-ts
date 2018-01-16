import * as React from 'react';
import Main from '../../components/Main/';
import { inject, observer } from 'mobx-react';
import { MainContainerProps } from '../../interfaces';

@inject('store') @observer
class MainContainer extends React.Component <MainContainerProps, {}> {

  onButtonClick = () => {
    this.props.store.ChartStore.fetch('BTC', this.props.store.UserStore._currency, ['max', 'ask']);
  }

  onHistoricalBtnClick = () => {
    this.props.store.ChartStore.historicalFetch();
  }

  render() {
    return (
      <Main
        pageHeading="Bitcoin"
        onButtonClick={this.onButtonClick}
        onHistoricalBtnClick={this.onHistoricalBtnClick}
      />
    );
  }
}

export default MainContainer;