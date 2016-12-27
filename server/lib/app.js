const express = require('express');
const app = express();

/* custom routes */
const images = require('./routes/images');
const albums = require('./routes/albums');

/* middleware */
const morgan = require('morgan');
const redirectHttp = require('./redirect-http')();
const cors = require('cors')();
const checkDb = require('./check-connection')();
const errorHandler = require('./error-handler');

if (process.env.NODE_ENV != 'test') app.use(morgan('dev')); // log events

// Redirect http to https in production on heroku
if(process.env.NODE_ENV === 'production') {
  app.use(redirectHttp);
}

app.use(cors);
app.use(express.static('./public'));

/* routes */
app.use(checkDb);
app.use('/api/images', images);
app.use('/api/albums', albums);

app.use(errorHandler);

module.exports = app;