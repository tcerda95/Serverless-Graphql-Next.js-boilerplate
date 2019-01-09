import PropTypes from 'prop-types';

const Post = PropTypes.shape({
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
});

export default Post;
