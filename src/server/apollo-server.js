const { ApolloServer, gql } = require('apollo-server-express');

const UserAPI = require('../datasources/user');
const BudgetAPI = require('../datasources/budget');

const typeDefs = gql`
  type User {
    id: String
  }

  type DateFormat {
    format: String
  }

  type CurrencyFormat {
    iso_code: String
    example_format: String
    decimal_digits: Int
    decimial_separator: String
    symbol_first: Boolean
    group_separator: String
    currency_symbol: String
    display_symbol: Boolean
  }

  type Budget {
    id: String
    name: String
    last_modified_on: String
    date_format: DateFormat
    currency_format: CurrencyFormat
  }

  type Error {
    id: String
    name: String
    detail: String
  }

  type Query {
    userInfo: User
    budgets: [Budget]
  }
`;

const resolvers = {
  Query: {
    userInfo: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.getUserInfo();
    },
    budgets: async (_source, _args, { dataSources }) => {
      return dataSources.budgetAPI.getBudgets();
    }
  }
};

const dataSources = () => ({
  userAPI: new UserAPI(),
  budgetAPI: new BudgetAPI()
});

const context = ({ req }) => ({ token: req.token });

const server = new ApolloServer({ typeDefs, resolvers, dataSources, context });

module.exports = server;
