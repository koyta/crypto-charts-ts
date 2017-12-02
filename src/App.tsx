import * as React from 'react';
import './App.css';

// Scripts
// import Auth from './scripts/authentication';

// Components
import Menu from './containers/Menu';
import Main from './containers/Main';

// Styles
import './params.css';
import './components/Menu/Menu.css';
import './components/Main/Main.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <Main />
      </div>
    );
  }
}

export default App;
