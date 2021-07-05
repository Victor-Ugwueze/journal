import { Sequelize } from 'sequelize-typescript';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

let sequelize;
const modelPath = '/**/*.model.js';

sequelize = new Sequelize({
  ...config,
  models: [__dirname + modelPath],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf('.model')).toLowerCase() ===
      member.toLowerCase()
    );
  },
});


export { Sequelize, sequelize };
