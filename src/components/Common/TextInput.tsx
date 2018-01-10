import * as React from 'react'

interface TextInputProps {
  name: string;
  placeholder?: string;
}

interface TextInputState {
  value: number | string;
  disabled?: boolean;
}

export default class TextInput extends React.Component<TextInputProps, TextInputState> {
  constructor(props: TextInputProps) {
    super(props);
    this.state = ({
      value: '',
      disabled: false
    });
  }

  onChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      value: e.currentTarget.value
    })
  };

  render() {
    return (
      <div className="ti">
        <label className="ti_label">
          {this.props.name}
        </label>
        <input type="text"
               className="ti_input"
               value={this.state.value}
               placeholder={this.props.placeholder}
               disabled={this.state.disabled}
               onChange={e => this.onChangeHandler(e)}
        />
      </div>
    );
  }
}

//TODO Подрубить к mobx