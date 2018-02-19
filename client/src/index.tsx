import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import ChartStore from './stores/ChartStore';
// import User from './stores/User';
// import AppStore from './stores/AppStore';

import RootStore from './stores/RootStore';

import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

// const stores = {
//   ChartStore,
//   User,
//   AppStore
// };

// const store = new RootStore();

useStrict(true);

ReactDOM.render(
    <Provider store={new RootStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);
