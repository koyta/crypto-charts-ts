import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ChartStore from './stores/ChartStore';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

const stores = {
    ChartStore
};

useStrict(true);

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
);
