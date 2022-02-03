const winston = require('winston');
const mongoose = require('mongoose');
const config = require('./config');

module.exports = function () {
  mongoose.connect(config.db.uri, config.db.parameters)
    .then(() => winston.info(`Connected to ${config.db.uri}...`));
}