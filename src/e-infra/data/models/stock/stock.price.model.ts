import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import StockModel from './stock.model'

@Table({
  tableName: 'stock_prices',
})
export default class StockPriceModel extends Model<StockPriceModel> {
  @ForeignKey(() => StockModel)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  symbol!: string

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  datePrice!: Date

  @Column({
    type: DataType.DOUBLE(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  open!: number

  @Column({
    type: DataType.DOUBLE(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  close!: number

  @Column({
    type: DataType.DOUBLE(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  high!: number

  @Column({
    type: DataType.DOUBLE(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  low!: number

  @Column({
    type: DataType.DOUBLE(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  latestPrice!: number

  @Column({ field: 'latest_price_time' })
  latestPriceTime!: Date

  @Column({
    type: DataType.DOUBLE(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  delayedPrice!: number

  @Column({ field: 'delayed_price_time' })
  delayedPriceTime!: Date

  @Column({
    type: DataType.DOUBLE(10, 2),
    allowNull: true,
  })
  previousClosePrice!: number

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt!: Date

  @BelongsTo(() => StockModel)
  stock!: StockModel
}

export type StockPriceModelInterface = typeof StockPriceModel
