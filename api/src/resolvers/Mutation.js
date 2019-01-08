const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

const Mutation = {
  signUp: async (parent, args, context) => {

    const hashedPassword = await bcrypt.hash(args.password, 10);
    
    const user = await context.User.create({ name: args.name, password: hashedPassword });

    return { token: user.token(), user };
  },

  signIn: async (parent, args, context) => {
    const user = await context.User.findOne({ name: args.name });

    if (!user)
      throw new Error('No such user found');

    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid)
      throw new Error('Invalid password');

    return { token: user.token(), user };
  },

  post: (parent, args, context) => context.Post.create({ title: args.title, content: args.content, author: context.auth.id })
};

module.exports = Mutation;
