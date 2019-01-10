import { Fragment } from 'react';
import styled from 'styled-components';
import Post from '../PropTypes/Post';

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const Tip = styled.small`
  margin-top: 5px;
  color: gray;
`;

const Content = styled.p`
  text-align: justify;
  margin-top: 25px;
`;

const PostItem = ({ post }) => {
  const { title, content, author } = post;

  return (
    <Fragment>
      <Title>{title}</Title>
      <Tip>made by {author.name}</Tip>
      <Content>{content}</Content>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: Post.isRequired
};

export default PostItem;
