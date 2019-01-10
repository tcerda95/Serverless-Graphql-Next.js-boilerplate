import PropTypes from 'prop-types';
import { Component } from 'react';
import styled from 'styled-components';
import ContainerItem from '../ContainerItem';
import TextInput from './TextInput';
import theme from '../../lib/theme';

const SubmitButton = styled.button`
  align-items: center;
  background-color: ${theme.colors.primary};
  border: 0;
  color: white;
  display: flex;
  padding: 0.5em 0.75em;
  cursor: pointer;
  font-size: 0.9em;

  &:hover {
    background-color: ${theme.hovers.primary};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: gray;
    cursor: default;
  }
`;

export default class TextForm extends Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    submitText: PropTypes.shape({
      submit: PropTypes.string.isRequired,
      submitting: PropTypes.string.isRequired
    }).isRequired,
    fields: PropTypes.array.isRequired,
    submitting: PropTypes.bool
  };

  static defaultProps = {
    submitting: false
  };

  handleSubmit = e => {
    const { onSubmit, value } = this.props;
    e.preventDefault();

    onSubmit(value);
  };

  handleChange = e => {
    const { onChange, value } = this.props;
    const inputName = e.target.name;
    const inputValue = e.target.value;

    const newValue = { ...value }; // clone props value to guarantee immutability

    newValue[inputName] = inputValue;

    onChange(newValue);
  };

  // Assumes every field is required
  disabled = () => {
    const { value, submitting } = this.props;

    if (submitting) {
      return true;
    }

    const values = Object.values(value);

    return values.some(v => v.length === 0);
  };

  render() {
    const { value, submitting, submitText, fields } = this.props;

    return (
      <ContainerItem as="form" onSubmit={this.handleSubmit}>
        {fields.map(f => (
          <TextInput key={f.name} value={value[f.name]} onChange={this.handleChange} {...f} />
        ))}
        <SubmitButton disabled={this.disabled()}>
          {submitting ? submitText.submitting : submitText.submit}
        </SubmitButton>
      </ContainerItem>
    );
  }
}
