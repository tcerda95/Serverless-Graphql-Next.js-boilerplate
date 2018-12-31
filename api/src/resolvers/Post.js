const Post = {
  author: (parent, args, context) => context.User.findById(parent.author)
};

module.exports = Post;
