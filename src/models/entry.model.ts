import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasMany,
  BeforeCreate,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './types'

// module.exports = (sequelize, DataTypes) => {
//   const Entry = sequelize.define('Entry', {
//     title: DataTypes.STRING,
//     body: DataTypes.STRING,
//     userId: {
//       type: DataTypes.INTEGER,
//       onDelete: 'CASCADE',
//       references: {
//         model: 'Users',
//         key: 'id',
//       },
//     },
//   }, {});

//   Entry.associate = (models) => {
//     Entry.belongsTo(models.User, {
//       as: 'users',
//       foreignKey: 'userId',
//       targetKey: 'id',
//       onDelete: 'CASCADE',
//     });
//   };
//   return Entry;
// };



@Table({
  tableName: 'entries',
  createdAt: 'create_date',
  updatedAt: false,
})
export class Entry extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  @Column
  id: number;

  @Column
  title: string;

  @Column
  body: string;  

  @ForeignKey(() => User)
  @Column
  userId: string;
}