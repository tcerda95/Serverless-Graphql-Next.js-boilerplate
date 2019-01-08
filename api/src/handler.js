const mongoose = require('mongoose');
const { GraphQLDateTime } = require('graphql-iso-date');
const { ApolloServer } = require('apollo-server-lambda');
const { importSchema } = require('graphql-import');
const { parse } = require('graphql');
const AuthDirective = require('graphql-directive-auth').default;

const logger = require('./utils/logger');
const auth = require('./utils/auth');

const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Post = require('./resolvers/Post');
const User = require('./resolvers/User');

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
  Query,
  Mutation,
  User,
  Post,
  DateTime: GraphQLDateTime
};

const typeDefs = parse(importSchema(`${__dirname}/schema/schema.graphql`));

const context = async ({ event, context }) => {
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
};

const authDirective = AuthDirective({
  authenticateFunc: context => auth.getUser(context.headers)
});

const schemaDirectives = {
  isAuthenticated: authDirective.isAuthenticated
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context,
  schemaDirectives
});

exports.graphqlHandler = server.createHandler();
