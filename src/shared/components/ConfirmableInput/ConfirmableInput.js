import React from 'react';
import PropTypes from 'prop-types';

class ConfirmableInput extends React.PureComponent {
  static propTypes = {
    onConfirm: PropTypes.func,
    defaultValue: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.focused = false;
    this.inputRef = React.createRef();

    document.addEventListener('keypress', this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onKeyPress);
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onConfirm();
    }
  };

  onFocus = () => {
    this.focused = true;
  };

  onBlur = () => {
    this.focused = false;
  };

  onConfirm = () => {
    const { onConfirm } = this.props;
    const { value } = this.inputRef.current;

    if (this.focused && onConfirm) {
      onConfirm(value);
    }
  };

  render() {
    const { defaultValue } = this.props;

    return (
      <div>
        <input
          ref={this.inputRef}
          defaultValue={defaultValue}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

export default ConfirmableInput;
