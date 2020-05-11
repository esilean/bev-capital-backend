import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript'
import UserModel from './user.model'
import StockModel from '../stock/stock.model'

@Table({
  tableName: 'user_stocks',
})
export default class UserStockModel extends Model<UserStockModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
  })
  userId!: string

  @ForeignKey(() => StockModel)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  symbol!: string

  @Column({
    type: DataType.DOUBLE(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  qty!: number

  @Column({
    type: DataType.DOUBLE(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  avgPrice!: number

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt!: Date

  @BelongsTo(() => StockModel)
  stock!: StockModel

  @BelongsTo(() => UserModel)
  user!: UserModel
}

export type UserStockModelInterface = typeof UserStockModel
