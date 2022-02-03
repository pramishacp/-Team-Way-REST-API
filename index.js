const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/env')();
require('./startup/validation')();
require('./startup/prod')(app);

const config = require('./startup/config');

const server = app.listen(config.app.port, () => winston.info(`Listening on port ${config.app.port}...`));
module.exports = server;