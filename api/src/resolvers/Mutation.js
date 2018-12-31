const Mutation = {
  user: (parent, args, context) => context.User.create({ name: args.name }),
  post: (parent, args, context) => context.Post.create({ title: args.title, content: args.content, author: args.author })
};

module.exports = Mutation;
