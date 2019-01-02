import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Layout from '../components/Layout';
import PostList from '../components/PostList';

export default () => (
  <Layout>
    <Query query={POSTS}>
      {QueriedPostList}
    </Query>
  </Layout>
);

const QueriedPostList = ({ data, loading, error }) => {
  if (loading)
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
