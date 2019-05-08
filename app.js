const restify = require('restify');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.listen(8080, () => {
  console.log('App Listening on port 8080');
});
