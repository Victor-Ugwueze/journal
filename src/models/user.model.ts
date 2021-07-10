import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';

import { Entry } from './entry.model'

@Table({
  tableName: 'users',
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

