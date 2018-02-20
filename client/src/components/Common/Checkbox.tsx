import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface CheckboxProps{
  text: string;
  value: string | number | string[];
  defaultChecked?: boolean;
  store?: any;
}

interface CheckboxState {
  checked: boolean;
}

@inject('store') @observer class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps) {
    super(props);
    this.state = {
      checked: this.props.store.UserStore.hasCrypto(this.props.value)
    };
  }

  onChangeHandle = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { UserStore } = this.props.store;
    UserStore.setCrypto(this.props.value);
    this.setState({
      checked: UserStore.hasCrypto(this.props.value)
    });
  }

  render() {
    const { UserStore } = this.props.store;
    return (
      <div className="cb">
        <label className="cb_label">
          <input
            type="checkbox"
            className="cb_input"
            onChange={e => this.onChangeHandle(e)}
            checked={this.state.checked}
            value={this.props.value}
          />
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default Checkbox;