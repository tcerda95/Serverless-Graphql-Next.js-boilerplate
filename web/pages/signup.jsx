import { Component } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Layout from '../components/Layout';
import TextForm from '../components/TextForm';
import auth from '../lib/auth';

export default class SignUp extends Component {
  state = {
    name: '',
    password: ''
  };

  fields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      tooltip: 'Something cool and original',
      required: true
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      tooltip: 'Something you can remember',
      required: true
    }
  ];

  submitText = {
    submit: 'Sign up',
    submitting: 'Signing up...'
  };

  handleComplete = ({ signUp }) => {
    const { user, token } = signUp;
    auth.signIn(user, token);
    Router.push('/');
  };

  handleChange = value => {
    this.setState(value);
  };

  MutatedSignUp = (signUp, { loading }) => (
    <TextForm
      value={this.state}
      fields={this.fields}
      onChange={this.handleChange}
      onSubmit={() => signUp()}
      submitText={this.submitText}
      submitting={loading}
    />
  );

  render() {
    return (
      <Layout title="Sign up">
        <Mutation mutation={SIGN_UP} variables={this.state} onCompleted={this.handleComplete}>
          {this.MutatedSignUp}
        </Mutation>
      </Layout>
    );
  }
}

const SIGN_UP = gql`
  mutation SignUp($name: String!, $password: String!) {
    signUp(name: $name, password: $password) {
      user {
        name
        id
      }
      token
    }
  }
`;
