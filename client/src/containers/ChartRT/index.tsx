import * as React from 'react';
import axios from 'axios';
import ChartRT from '../../components/ChartRT';
import { inject, observer } from 'mobx-react';
import {
  ChartContainerProps,
  ChartRTState,
  RealtimeData,
  RealtimeWebsocketData,
} from '../../interfaces';
import { toJS } from 'mobx';

@inject('store') @observer
class ChartRTContainer extends React.Component<ChartContainerProps, ChartRTState> {

  constructor(props: ChartContainerProps) {
    super(props);
    this.state = {
      isFetching: false,
      status: 'Status'
    };
  }

  /**
   * updating props according to coming store realtime data
   */

  createWebsocket = () => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('chart created, websocket connection opened');
      this.setState({ status: 'Connected.' });
    };

    ws.onclose = close => {
      console.log('client closed connection', close.code);
      this.setState({ isFetching: false, status: 'Connection is closed.' });
    };

    ws.onerror = (error) => {
      console.log('No connection to backend');
      this.setState({ isFetching: false, status: 'No connection to the server.' });
    };

    ws.onmessage = message => {
      console.log(JSON.parse(message.data));
      let fetched: RealtimeData = JSON.parse(message.data);
      if (fetched.data === 'OK') {
        console.log('Connection established, starting fetch');
        this.setState({ isFetching: true });
      } else {
        console.log('Updating store data');
        if (fetched.data) {
          let parsed: RealtimeWebsocketData = fetched.data;
          this.props.store.ChartStore.updateRealtimeData(parsed);
        }
      }
    };
  }

  startFetching = () => {
    console.log('click start fetch');
    if (!this.state.isFetching) { this.createWebsocket(); }
    try {
      axios.post('/wss/connect', {
        crypto: 'BTC',
        currency: 'RUB'
      });
    } catch (error) {
      console.error(error);
    }
    this.setState({ isFetching: true, status: 'Connecting...' });
  }

  stopFetching = () => {
    this.setState({ isFetching: false, status: 'Stopping...' }, () => {
      axios.get('/wss/close');
    });
    this.setState({ status: 'Stopped. You can connect.' });
  }

  render() {
    const { options, realtimeData } = this.props.store.ChartStore;
    return (
      <ChartRT
        data={toJS(realtimeData)}
        options={options}
        startFetching={this.startFetching}
        stopFetching={this.stopFetching}
        isFetching={this.state.isFetching}
        status={this.state.status}
      />
    );
  }
}

export default ChartRTContainer;
