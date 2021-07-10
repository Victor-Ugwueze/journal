import { Sequelize } from 'sequelize-typescript';

type DataBaseConfig = {
  host: string;
  username: string;
  password: string;
  database: string;
  dialect: 'postgres' | 'mysql'
}

const env = process.env.NODE_ENV || 'development';
const config: DataBaseConfig = require('../config/database.js')[env];

let sequelize: Sequelize;
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
