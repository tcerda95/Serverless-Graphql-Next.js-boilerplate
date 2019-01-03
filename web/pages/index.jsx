import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import auth from '../lib/auth';
import Layout from '../components/Layout';
import PostList from '../components/PostList';

const Index = () => (
  <Layout title="Posts">
    <Query query={POSTS}>
      {QueriedPostList}
    </Query>
  </Layout>
);

Index.getInitialProps = async context => {
  const user = auth.loggedUser(context);
  return { user };
};

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

export default Index;
