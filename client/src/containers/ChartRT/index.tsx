import * as React from 'react';
import ChartRT from '../../components/ChartRT';
import { inject, observer } from 'mobx-react';
import { ChartContainerProps } from '../../interfaces';

interface ChartRTState {
  data: number;
}

@inject('store') @observer
class ChartRTContainer extends React.Component<ChartContainerProps, ChartRTState> {

  constructor(props: ChartContainerProps) {
    super(props);
    this.state = {
      data: 0
    };
  }

  componentDidMount() {
    /*fetch('/btcusd')
      .then(res => res.json())
      .then(res => this.setState({data: res}));*/
  }

  componentWillReceiveProps() {
  }

  render() {
    return <ChartRT {...this.props} data={this.state.data}/>;
  }
}

export default ChartRTContainer;
