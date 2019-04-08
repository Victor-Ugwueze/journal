require('dotenv').config();

const envExists = require('./utils');

const env = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT,
  NODE_ENV: process.env.NODE_ENV || 'production',
};

module.exports = envExists(env);
