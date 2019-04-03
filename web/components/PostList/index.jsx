import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Post from '../PropTypes/Post';
import PostItem from './PostItem';
import ContainerItem from '../ContainerItem';

const Item = styled(ContainerItem)`
  margin-top: 5px;

  &:first-of-type {
    margin-top: 0;
  }
`;

const PostList = ({ posts }) => (
  <ul>
    {posts.map(p => (
      <Item key={p.id} as="li">
        <PostItem post={p} />
      </Item>
    ))}
  </ul>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(Post.isRequired).isRequired
};

export default PostList;
