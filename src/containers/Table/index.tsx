import * as React from 'react';
import Table from '../../components/Table';
import {TableProps} from "react-table";

let data = [
  {
    Header: 'Crypto',
    columns: [
      {
        Header: 'Name'
      }
    ],
  },
  {
    Header: 'Currency',
    columns: [
      {
        Header: 'RUB'
      },
      {
        Header: 'USD'
      }
    ]
  },
];

class TableContainer extends React.Component<TableProps, any> {
  constructor(props: TableProps) {
    super(props);
  }

  render() {
    return <Table data={data}/>
  }
}

export default TableContainer;