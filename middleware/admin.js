const config = require("../startup/config");

module.exports = function (req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden
  if (!config.app.requiresAuth) return next();

  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
}