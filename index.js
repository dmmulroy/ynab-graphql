const server = require('./src/server');

server.listen(3000, err => {
  if (err) console.log('error starting server', err);
  console.log('server running on port', 3000);
});
