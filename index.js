const server = require('./src/server');

server
  .listen(3000)
  .then(({ url }) => console.log(`ynab-graphql running at ${url}`))
  .catch(err => console.log('error starting server', err));
