import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface CheckboxProps{
  text: string;
  value: string | number | string[];
  defaultChecked?: boolean;
}

interface CheckboxState {
  checked: boolean;
}

@inject('ChartStore') @observer class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps) {
    super(props);
    this.state = ({
      checked: false
    });
  }

  onClickHandle = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    return (
      <div className="cb">
        <label className="cb_label">
          <input
            type="checkbox"
            className="cb_input"
            onClick={e => this.onClickHandle(e)}
            checked={this.state.checked}
            value={this.props.value}
            defaultChecked={this.props.defaultChecked}
          />
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default Checkbox;