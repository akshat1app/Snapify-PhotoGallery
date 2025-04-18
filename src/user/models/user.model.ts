import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({ allowNull: false })
  declare name: string;

  @Column({ unique: true, allowNull: false })
  declare email: string;

  @Column({ allowNull: false })
  declare password: string;

  @Column({ defaultValue: false })
  declare isAdmin: boolean;
}
