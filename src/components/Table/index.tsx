import * as React from 'react';
import 'react-table/react-table.css';
import * as ReactTable from "react-table";
import {TableProps} from "react-table";

const Table = (props: TableProps) => {
  return (
    <ReactTable columns={props.data}/>
  );
};

export default Table;