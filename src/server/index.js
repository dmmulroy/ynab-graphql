const express = require('express');

const apolloServer = require('./apollo-server');
const tokenMiddleware = require('../middleware/api-token');

const app = express();

app.use(tokenMiddleware);

apolloServer.applyMiddleware({ app });

module.exports = app;
