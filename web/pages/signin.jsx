import { Component } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Layout from '../components/Layout';
import SignIn from '../components/SignIn';
import auth from '../lib/auth';

export default class SignInPage extends Component {
  state = {
    name: ''
  }

  handleComplete = ({ user }) => {
    auth.signIn(user);
    Router.push('/');
  }

  handleChange = name => {
    this.setState({ name });
  }

  MutatedSignIn = (createUser, { loading }) => {
    const { name } = this.state;

    return <SignIn value={name} onChange={this.handleChange} onSubmit={createUser} submitting={loading} />;
  }

  render() {
    const { name } = this.state;

    return (
      <Layout title="Sign in">
        <Mutation mutation={CREATE_USER} variables={{ name }} onCompleted={this.handleComplete}>
          {this.MutatedSignIn}
        </Mutation>
      </Layout>
    );
  }
};

const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    user(name: $name) {
      id
      name
    }
  }
`;
