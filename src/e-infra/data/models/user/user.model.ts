import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  IsEmail,
  Length,
  BeforeCreate,
  HasMany,
  PrimaryKey,
} from 'sequelize-typescript'
import { encryptPassword } from '../../../cross-cutting/authentication/encryption'
import UserStockModel from './user.stock.model'

@Table({
  tableName: 'users',
})
export default class UserModel extends Model<UserModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string

  @Length({ max: 50 })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string

  @IsEmail
  @Length({ max: 100 })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string

  @Length({ max: 100 })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  password!: string

  @HasMany(() => UserStockModel)
  userStocks!: UserStockModel[]

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt!: Date

  @BeforeCreate
  static encryptPassword(user: UserModel): void {
    user.password = encryptPassword(user.password)
  }
}

export type UserModelInterface = typeof UserModel
