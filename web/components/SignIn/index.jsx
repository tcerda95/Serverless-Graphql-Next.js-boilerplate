import { Component } from 'react';
import styled from '@emotion/styled';
import ContainerItem from '../ContainerItem';
import TextInput from './TextInput';

const SubmitButton = styled.button`
  align-items: center;
  background-color: ${props => props.theme.colors.primary};
  border: 0;
  color: white;
  display: flex;
  padding: 0.5em 0.75em;
  cursor: pointer;
  font-size: 0.9em;

  &:hover {
    background-color: ${props => props.theme.hovers.primary};    
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: gray;
    cursor: default;
  }
`;

export default class SignIn extends Component {
  handleSubmit = e => {
    const { onSubmit, value } = this.props;
    e.preventDefault();

    onSubmit(value);
  }

  handleChange = e => {
    const { onChange } = this.props;
    const name = e.target.value;

    onChange(name);
  }

  render() {
    const { value, submitting } = this.props;
    const disabled = value.length === 0 || submitting;

    return (
      <ContainerItem as="form" onSubmit={this.handleSubmit}>
        <TextInput onChange={this.handleChange} name="Name" value={value} tooltip="No sign up required! Just choose a name" />
        <SubmitButton disabled={disabled}>{submitting ? 'Signing in...' : 'Sign in'}</SubmitButton>
      </ContainerItem>
    );
  }
};
