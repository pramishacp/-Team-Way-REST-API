const winston = require('winston');

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);

  // winston.error(`${err.status || 500} ${err.message} ${req.method} ${req.originalUrl} ${req.ip}`, err);

  // error
  // warn
  // info
  // verbose
  // debug 
  // silly

  res.status(500).send('Something failed.');
}