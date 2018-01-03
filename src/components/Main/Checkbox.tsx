import * as React from 'react'

interface CheckboxProps {
  name: string;
}

interface CheckboxState {
  checked: boolean;
}

export default class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps) {
    super(props);
    this.state = ({
      checked: false
    });
  }

  onClickHandle = () => {
    this.setState({
      checked: !this.state.checked
    })
  };

  render() {
    return (
      <label>
        <input
          type="checkbox"
          onClick={this.onClickHandle}
          checked={this.state.checked}/>
        {this.props.name}
      </label>
    );
  }
}