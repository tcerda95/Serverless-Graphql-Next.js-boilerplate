import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import auth from '../lib/auth';
import Layout from '../components/Layout';
import PostList from '../components/PostList';

const Index = () => (
  <Layout title="Posts">
    <Query query={POSTS} fetchPolicy="cache-and-network">
      {QueriedPostList}
    </Query>
  </Layout>
);

const QueriedPostList = ({ data, loading, error }) => {
  if (loading && !data)
    return <h1>Loading...</h1>;

  if (error)
    return <h1>Error</h1>;

  return <PostList posts={data.posts} />
};

const POSTS = gql`
  query {
    posts {
      id
      title
      content
      author {
        name
      }
    }
  }
`;

export default Index;
