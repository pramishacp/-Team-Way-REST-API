require('dotenv').config();

// false, null, undefined, 0, -0, 0n, NaN, ""

module.exports = function () {
  if (!process.env.NODE_ENV) { throw new Error('FATAL ERROR: NODE_ENV is not defined.'); }
  if (!process.env.TEST_APP_PORT) { throw new Error('FATAL ERROR: TEST_APP_PORT is not defined.'); }
  if (!process.env.DEV_APP_PORT) { throw new Error('FATAL ERROR: DEV_APP_PORT is not defined.'); }
  if (!process.env.PROD_APP_PORT) { throw new Error('FATAL ERROR: PROD_APP_PORT is not defined.'); }
  if (!process.env.DEV_APP_REQUIRES_AUTH) { throw new Error('FATAL ERROR: DEV_APP_REQUIRES_AUTH is not defined.'); }
  if (!process.env.TEST_APP_REQUIRES_AUTH) { throw new Error('FATAL ERROR: TEST_APP_REQUIRES_AUTH is not defined.'); }
  if (!process.env.PROD_APP_REQUIRES_AUTH) { throw new Error('FATAL ERROR: PROD_APP_REQUIRES_AUTH is not defined.'); }
  if (!process.env.DEV_APP_DB) { throw new Error('FATAL ERROR: PROD_APP_PORT is not defined.'); }
  if (!process.env.TEST_APP_DB) { throw new Error('FATAL ERROR: DEV_APP_DB is not defined.'); }
  if (!process.env.PROD_APP_DB) { throw new Error('FATAL ERROR: PROD_APP_DB is not defined.'); }
  if (!process.env.SALT_WORK_FACTOR) { throw new Error('FATAL ERROR: SALT_WORK_FACTOR is not defined.'); }
  if (!process.env.JWT_SECRET) { throw new Error('FATAL ERROR: LOCK_TIME is not defined.'); }
  if (!process.env.MAX_LOGIN_ATTEMPTS) { throw new Error('FATAL ERROR: MAX_LOGIN_ATTEMPTS is not defined.'); }
  if (!process.env.LOCK_TIME) { throw new Error('FATAL ERROR: LOCK_TIME is not defined.'); }
  if (!process.env.NODEMAILER_TRANSPORT_SERVICE_USER) { throw new Error('FATAL ERROR: NODEMAILER_TRANSPORT_SERVICE_USER is not defined.'); }
  if (!process.env.NODEMAILER_TRANSPORT_SERVICE_PASS) { throw new Error('FATAL ERROR: NODEMAILER_TRANSPORT_SERVICE_PASS is not defined.'); }
}