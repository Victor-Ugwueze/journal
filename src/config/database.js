require('dotenv').config();

const env = require('./environment.js');

const defaultConfig = {
  databaseUrl: env.DATABASE_URL,
  username: process.env.USERNAME,
  database: process.env.DB_NAME,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  dialect: env.DATABASE_DIALECT || 'postgres',
  use_env_variable: 'DATABASE_URL',
};

module.exports = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
  },
  production: {
    ...defaultConfig,
  },
};
