import * as React from 'react';
import Menu from '../../components/Menu';
import { inject } from 'mobx-react';

@inject('store')
class MenuContainer extends React.Component<{store?: any}, {}> {

  onCurrencyChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.store.UserStore.setCurrency(event.currentTarget.value.toUpperCase());
  }

  onTypeChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.store.ChartStore.setChartType(event.currentTarget.value.toLowerCase());
  }

  onPeriodChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.store.ChartStore.setHistoricalPeriod(event.currentTarget.value.toLowerCase());
  }

  render() {
    return (
      <Menu
        {...this.props}
        onCurrencyChange={this.onCurrencyChange}
        onTypeChange={this.onTypeChange}
        onPeriodChange={this.onPeriodChange}
      />
    );
  }
}

export default MenuContainer;