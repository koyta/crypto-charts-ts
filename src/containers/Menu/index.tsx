import * as React from 'react';
import MenuComponent from '../../components/Menu';
import {inject, observer} from "mobx-react";
import {IMenuInterface} from "../../interfaces";

@inject('User') @observer
class Menu extends React.Component<IMenuInterface, {}> {

  render() {
    return (
      <MenuComponent {...this.props} />
    )
  }
}

export default Menu;