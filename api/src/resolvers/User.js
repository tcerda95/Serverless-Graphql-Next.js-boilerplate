const User = {
  posts: (parent, args, context) => context.Post.find({ author: parent.id })
};

module.exports = User;
