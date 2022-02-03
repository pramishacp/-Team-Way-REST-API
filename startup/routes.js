const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const workers = require('../routes/workers');
const shifts = require('../routes/shifts');
const error = require('../middleware/error');
const swaggerUi = require("swagger-ui-express");
const { swaggerDocument } = require('../swagger/swaggerDocument');
const cors = require('cors');
const morgan = require('morgan');

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use(morgan('tiny'));
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/shifts', shifts);
  app.use('/api/workers', workers);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(error);
}