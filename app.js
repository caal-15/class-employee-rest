const restify = require('restify');
const db = require('./database');
const employeeRepository = require('./repositories/employees')(db);
const employeeRoute = require('./routes/employees');
const morgan = require('morgan');

const server = restify.createServer();

server.pre(restify.pre.sanitizePath());
server.use(morgan('dev'));
server.use(restify.plugins.bodyParser());

employeeRoute(server, '/employees', employeeRepository);

server.listen(8080, () => {
  console.log('App Listening on port 8080');
});
