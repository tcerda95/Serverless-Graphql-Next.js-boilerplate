const Query = {
  hello: () => 'Hello World!',
  users: (parent, args, context) => context.User.find(),
  user: (parent, args, context) => context.User.findById(args.id),
  posts: (parent, args, context) => context.Post.find()
};

module.exports = Query;
