const { ApolloServer } = require('apollo-server-lambda');
const { importSchema } = require('graphql-import');
const { parse } = require('graphql');

const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
};

const typeDefs = parse(importSchema(`${__dirname}/schema/schema.graphql`));

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.graphqlHandler = server.createHandler();
