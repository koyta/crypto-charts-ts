import * as React from 'react';
import ChartComponent from '../../components/Chart';
import { testApiRoot } from '../../scripts/gettingData';
import axios from 'axios';
// import { options } from '../../scripts/authentication';

class Chart extends React.Component<IChartProps> {

  constructor(props: IChartProps) {
    super(props);

    this.state = {
      data: {
        labels: [
          'Currency'
        ],
        datasets: [
          {
            label: 'BTC',
            data: [
              301510,
              320123,
              322015,
              318950
            ],
          },
          // {
          //   label: 'BCH',
          //   data: [
          //     230681,
          //     245121,
          //     254361,
          //     260681
          //   ],
          // },
          // {
          //   label: 'ETH',
          //   data: [
          //     124151,
          //     123250,
          //     141234,
          //     142017
          //   ],
          // },
          // {
          //   label: 'LTC',
          //   data: [
          //     75627,
          //     76668,
          //     81621,
          //     79625
          //   ],
          // }
        ]
      }
    };
  }

  // TODO: Реализовать return полученных данных из функции makeRequest
  makeRequest = (url: string) => {
    axios.get(testApiRoot + url)
        .then(
          result => {
            if (result.status === 200) {
              return (result.data);
            }
          },
          error => {
            alert(error);
          }
        );
  }

  render() {
    return (
      <ChartComponent data={this.makeRequest('/posts')} />
    );
  }

}

export default Chart;