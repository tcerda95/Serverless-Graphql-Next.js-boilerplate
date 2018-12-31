const mongoose = require('mongoose');
const { GraphQLDateTime } = require('graphql-iso-date');
const { ApolloServer } = require('apollo-server-lambda');
const { importSchema } = require('graphql-import');
const { parse } = require('graphql');
const logger = require('./utils/logger');

require('./model/User');
require('./model/Post');

let db = null;
const dbUrl = process.env.DB_URL;
const dbOptions = {
  promiseLibrary: Promise,
  useNewUrlParser: true,
  bufferCommands: false,
  bufferMaxEntries: 0
};

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    users: (parent, args, context) => context.User.find(),
    posts: (parent, args, context) => context.Post.find()
  },

  Mutation: {
    user: (parent, args, context) => context.User.create({ name: args.name }),
    post: (parent, args, context) => context.Post.create({ title: args.title, content: args.content, author: args.author })
  },

  User: {
    posts: (parent, args, context) => context.Post.find({ author: parent.id })
  },

  Post: {
    author: (parent, args, context) => context.User.findById(parent.author)
  },

  DateTime: GraphQLDateTime
};

const typeDefs = parse(importSchema(`${__dirname}/schema/schema.graphql`));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ event, context }) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (!db) {
      db = await mongoose.createConnection(dbUrl, dbOptions);
      logger.info('Connected to database');
    }

    return {
      db,
      User: db.model('User'),
      Post: db.model('Post'),
      headers: event.headers
    };
  }
});

exports.graphqlHandler = server.createHandler();
