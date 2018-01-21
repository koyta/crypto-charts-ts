import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface TextInputProps {
  name: string;
  placeholder?: string;
  store?: any;
}

interface TextInputState {
  value: number | string;
  disabled?: boolean;
}

@inject('store') @observer
class TextInput extends React.Component<TextInputProps, TextInputState> {

  constructor(props: TextInputProps) {
    super(props);
    this.state = ({
      value: '', // для сохранения результата
      disabled: false
    });
  }

  componentDidMount() {
    this.setState({
      value: this.props.store.UserStore.getNumResults
    });
  }

  onChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({value: e.currentTarget.value.toString()});
    this.props.store.UserStore.setNumResults(e.currentTarget.value);
  }

  onKeyPressHandle = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      // FIXME Перезагружает страницу по нажатию на Enter
    }
  }

  render() {
    return (
      <div className="ti">
        <label className="ti_label">
          {this.props.name}
        </label>
        <input
          type="text"
          className="ti_input"
          value={this.state.value}
          placeholder={this.props.placeholder}
          disabled={this.state.disabled}
          onChange={e => this.onChangeHandler(e)}
          onKeyDown={e => this.onKeyPressHandle(e)}
        />
      </div>
    );
  }
}

export default TextInput;

// TODO Подрубить к mobx