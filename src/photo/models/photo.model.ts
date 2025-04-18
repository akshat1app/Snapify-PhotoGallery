import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';

@Table
export class Photo extends Model {
  @Column
  fileName: string;

  @Column
  fileSize: number;

  @Column
  filePath: string;

  @Column
  caption: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
    uploadCount: any;
}
