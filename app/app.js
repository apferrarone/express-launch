 //   __ _ _ __  _ __
 //  / _` | '_ \| '_ \
 // | (_| | |_) | |_) |
 //  \__,_| .__/| .__/
 //       |_|   |_|


const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('../config/config');
const routes = require('./routes');

const app = express();

// uncomment after placing your favicon in /app/public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  let message = err.message;
  let error = req.app.get('env') === 'development' ? err : {};
  let code = err.status || err.code || 500;

  res.status(code);
  res.json({
    error: {
      code: code,
      message: err.message || 'Server Error',
      error: error
    }
  });
});

module.exports = app;
