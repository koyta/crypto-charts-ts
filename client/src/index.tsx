import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import RootStore from './stores/RootStore';

import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

useStrict(true);

ReactDOM.render(
    <Provider store={new RootStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);
