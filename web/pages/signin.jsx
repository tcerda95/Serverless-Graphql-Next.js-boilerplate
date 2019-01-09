import { Component } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Layout from '../components/Layout';
import TextForm from '../components/TextForm';
import auth from '../lib/auth';

export default class SignIn extends Component {
  state = {
    name: '',
    password: ''
  };

  fields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text'
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password'
    }
  ];

  submitText = {
    submit: 'Sign in',
    submitting: 'Signing in...'
  };

  handleComplete = ({ signIn }) => {
    const { user, token } = signIn;
    auth.signIn(user, token);
    Router.push('/');
  };

  handleChange = value => {
    this.setState(value);
  };

  MutatedSignIn = (signIn, { loading }) => (
    <TextForm
      value={this.state}
      fields={this.fields}
      onChange={this.handleChange}
      onSubmit={() => signIn()}
      submitText={this.submitText}
      submitting={loading}
    />
  );

  render() {
    return (
      <Layout title="Sign in">
        <Mutation mutation={SIGN_IN} variables={this.state} onCompleted={this.handleComplete}>
          {this.MutatedSignIn}
        </Mutation>
      </Layout>
    );
  }
}

const SIGN_IN = gql`
  mutation SignIn($name: String!, $password: String!) {
    signIn(name: $name, password: $password) {
      user {
        name
        id
      }
      token
    }
  }
`;
