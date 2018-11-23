const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const typeDefs = gql`
  type User {
    id: String
  }

  type Error {
    id: String
    name: String
    detail: String
  }

  type Query {
    user: User
  }
`;

const resolvers = {
  Query: {
    user: () => ({ id: '123' })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

module.exports = app;
