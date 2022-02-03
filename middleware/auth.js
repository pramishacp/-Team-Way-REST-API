require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require("../startup/config");

module.exports = function (req, res, next) {
  if (!config.app.requiresAuth) return next();

  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch (ex) {
    console.log('ex', ex)
    res.status(400).send('Invalid token.');
  }
}