const { ApolloServer, gql } = require('apollo-server');

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

  type Account {
    id: String
    name: String
    type: String
    on_budget: Boolean
    closed: Boolean
    note: String
    balance: Float
    cleared_balance: Float
    uncleared_balance: Float
    transfer_payee_id: String
    deleted: Boolean
  }

  type Budget {
    id: String
    name: String
    last_modified_on: String
    date_format: DateFormat
    currency_format: CurrencyFormat
    accounts: [Account]
  }

  type Error {
    id: String
    name: String
    detail: String
  }

  type Query {
    user: User
    budgets: [Budget]
    budgetById(id: String!): Budget
  }
`;

const resolvers = {
  Query: {
    user: async (_source, _args, { dataSources }) => {
      return dataSources.userAPI.getUserInfo();
    },
    budgets: async (_source, _args, { dataSources }) => {
      return dataSources.budgetAPI.getBudgets();
    },
    budgetById: async (_source, { id }, { dataSources }) => {
      return dataSources.budgetAPI.getBudgetById(id);
    }
  }
};

const dataSources = () => ({
  userAPI: new UserAPI(),
  budgetAPI: new BudgetAPI()
});

const context = ({ req }) => {
  const authorizationHeader = req.headers.authorization || '';

  const [_bearer, token] = authorizationHeader.split(' ');

  return { token };
};

const server = new ApolloServer({ typeDefs, resolvers, dataSources, context });

module.exports = server;
