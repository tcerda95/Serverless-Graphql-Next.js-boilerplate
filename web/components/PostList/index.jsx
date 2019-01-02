import styled from '@emotion/styled';
import PostItem from './PostItem';
import ContainerItem from '../ContainerItem';

const Title = styled.h1`
  font-size: 30px;
`;

const Item = styled(ContainerItem)`
  margin-top: 5px;
  
  &:first-of-type {
    margin-top: 0
  }
`;

const PostList = ({ posts }) => (
  <div>
    <Title>Posts</Title>
    <ul>
      {posts.map(p => (
        <Item key={p.id} as="li">
          <PostItem post={p} />
        </Item>
      ))}
    </ul>
  </div>
);

export default PostList;
