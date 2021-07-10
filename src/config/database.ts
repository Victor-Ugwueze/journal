require('dotenv').config();

const env = require('./environment.js');


const defaultConfig = {
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password:  process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: env.DB_DIALECT
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
