import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface RadioProps {
  text: string;
  name: string;
  value: string | number | string[];
  store?: any;

  onChangeHandle(event: React.SyntheticEvent<HTMLInputElement>): void;
}

interface RadioState {
  defaultChecked: boolean;
}

@inject('store') @observer
class RadioButton extends React.Component<RadioProps, RadioState> {
  constructor(props: RadioProps) {
    super(props);
    this.state = ({
      defaultChecked: (this.props.store.UserStore.getCurrency === this.props.value || this.props.store.ChartStore.chartType === this.props.value)
    });
  }

  render() {
    return (
      <div className="rb">
        <label className="rb_label">
          <input
            type="radio"
            className="rb_input"
            onChange={this.props.onChangeHandle}
            name={this.props.name}
            value={this.props.value}
            defaultChecked={this.state.defaultChecked}
          />
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default RadioButton;