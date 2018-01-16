import * as React from 'react';
import MenuComponent from '../../components/Menu';
import { inject } from 'mobx-react';
import { MenuContainer } from '../../interfaces';

@inject('store')
class Menu extends React.Component<MenuContainer, {}> {

  constructor(props: MenuContainer) {
    super(props);
  }

  onCurrencyChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.store.UserStore.setCurrency(event.currentTarget.value.toUpperCase());
  }

  onTypeChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.store.ChartStore.setChartType(event.currentTarget.value.toLowerCase());
  }

  render() {
    return (
      <MenuComponent {...this.props} onCurrencyChange={this.onCurrencyChange} onTypeChange={this.onTypeChange}/>
    );
  }
}

export default Menu;