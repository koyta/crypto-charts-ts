import * as React from 'react';
import * as DevTools from 'mobx-react-devtools';
import Menu from './containers/Menu';
import Main from './containers/Main';
import './App.css';
import './params.css';
import './components/Menu/Menu.css';
import './components/Main/Main.css';

class App extends React.Component {
  render() {
    return (
      [
        <Menu />,
        <Main />
      ]
    );
  }
}

export default App;
