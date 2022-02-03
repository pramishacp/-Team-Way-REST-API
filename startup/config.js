require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';

// `mongodb://${config.db.username}:${config.db.password}@${config.db.host1}:${config.db.port1},${config.db.host2}:${config.db.port2},${config.db.host3}:${config.db.port3}/${config.db.authdb}?${options}`

const config = {
    'dev': {
        app: {
            port: parseInt(process.env.DEV_APP_PORT),
            requiresAuth: process.env.DEV_APP_REQUIRES_AUTH === 'true' ? true : false,
        },
        db: {
            uri: process.env.DEV_APP_DB,
            parameters: { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
        },
    },
    'test': {
        app: {
            port: parseInt(process.env.TEST_APP_PORT),
            requiresAuth: process.env.TEST_APP_REQUIRES_AUTH === 'true' ? true : false,
        },
        db: {
            uri: process.env.TEST_APP_DB,
            parameters: { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
        },
    },
    'prod': {
        app: {
            port: parseInt(process.env.PROD_APP_PORT),
            requiresAuth: process.env.PROD_APP_REQUIRES_AUTH === 'true' ? true : false,
        },
        db: {
            uri: process.env.PROD_APP_DB,
            parameters: { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
        },
    }
}

module.exports = config[env];
