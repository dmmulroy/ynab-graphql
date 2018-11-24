const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const server = require('./src/server');

if (cluster.isMaster) {
  console.log(`ynab-graphql master (pid: ${process.pid}) started...`);

  for (let idx = 0; idx < numCPUs; idx++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`ynab-graphql worker (pid: ${worker.process.pid}) died`);
    console.log('Forking a new process...');

    cluster.fork();
  });
} else {
  server
    .listen(3000)
    .then(() =>
      console.log(`ynab-graphql worker (pid: ${process.pid}) started...`)
    )
    .catch(err => console.log('error starting server', err));
}
