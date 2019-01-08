import { Component } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { POSTS } from './index';
import Layout from '../components/Layout';
import TextForm from '../components/TextForm';

export default class NewPost extends Component {
  state = {
    title: '',
    content: ''
  }

  fields = [
    { 
      label: 'Title',
      name: 'title',
      type: 'text',
      tooltip: 'Catchy!',
      required: true
    },
    { 
      label: 'Content',
      name: 'content',
      type: 'text',
      required: true
    }
  ]

  submitText = {
    submit: 'Post',
    submitting: 'Posting...'
  }

  handleComplete = () => {
    Router.push('/');
  }

  handleChange = value => {
    this.setState(value);
  }

  MutatedPost = (post, { loading }) => (
    <TextForm 
      value={this.state}
      fields={this.fields}
      onChange={this.handleChange}
      onSubmit={() => post()}
      submitText={this.submitText}
      submitting={loading}
    />
  )

  render() {
    return (
      <Layout title="New post">
        <Mutation mutation={POST} variables={this.state} onCompleted={this.handleComplete}>
          {this.MutatedPost}
        </Mutation>
      </Layout>
    );
  }
}

const POST = gql`
  mutation post($title: String!, $content: String!) {
    post(title: $title, content: $content) {
      title
      id
      content
      author {
        name
      }
    }
  }
`;
