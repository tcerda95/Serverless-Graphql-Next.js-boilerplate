import Layout from '../components/Layout';
import PostList from '../components/PostList';

const posts = [
  {
    title: 'My first post!',
    content: 'This is my first post and I am pretty proud about it!',
    author: { name: 'Tomás Cerdá' },
    id: 1
  },
  {
    title: 'My first post!',
    content: 'This is my first post and I am pretty proud about it!',
    author: { name: 'Tomás Cerdá' },
    id: 2
  }
];

export default () => (
  <Layout>
    <PostList posts={posts} />
  </Layout>
);
