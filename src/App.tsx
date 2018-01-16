import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Devtools from 'mobx-react-devtools';
import Menu from './containers/Menu';
import Main from './containers/Main';
import './App.css';
import './params.css';
import './components/Menu/Menu.css';
import './components/Main/Main.css';
import './components/Common/TextInput.css';
import './components/Common/Checkbox.css';

import { AppProps } from './interfaces';

@inject('store') @observer
class App extends React.Component<AppProps, AppProps> {

  render() {
    const closeImg = './assets/Close.png';
    const openImg = './assets/Menu.png';
    return (
      <div className="wrapper">
        <button
          className="btn sidebar-btn"
          onClick={() => this.props.store.AppStore.toggleSidebar()}
          // style={{backgroundImage: `url(${this.props.store.AppStore.showSidebar? openImg : closeImg })`}}
        />
        <Menu />
        <Main />
      </div>
    );
  }

}

export default App;
