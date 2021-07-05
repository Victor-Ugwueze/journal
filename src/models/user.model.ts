import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';

import { Entry } from './entry.model'


// export interface UserModel
//     extends Model<UserAttributes>,
//     UserAttributes {}

// export type UserStatic = typeof Model & {
//   new (values?: object, options?: BuildOptions): UserModel;
// };

// module.exports = (sequelize: Sequelize) => {
//   const User = sequelize.define('User', {
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     imageUrl: DataTypes.STRING,
//   }, {});

//   User.associate = (models) => {
//     User.hasMany(models.Entry, {
//       foreignKey: 'userId',
//       as: 'entries',
//     });
//   };
//   return User;
// };







@Table({
  tableName: 'users',
  createdAt: 'create_date',
  updatedAt: false,
})
export class User extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  @Column
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;  
  
  @Column
  imageUrl: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Entry, 'user_id')
  entries: Entry[];
}

