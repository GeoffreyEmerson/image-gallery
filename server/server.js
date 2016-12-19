const app = require('./lib/app');
const http = require('http');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Async - Create Mongo connection
require( './lib/setup-mongoose' );

// Async - Lookup current IP
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('Current IP:',add,fam);
});

// Async - Start listening for http requests
server.listen(port, () => {
  console.log('Server running on localhost:' + server.address().port);
});
