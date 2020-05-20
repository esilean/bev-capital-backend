import { FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from 'sequelize/types'
import StockPrice from '../../../d-domain/entities/stock.prices'

export interface StockPriceInterface {
  symbol: string
  open: number
  close: number
  high: number
  low: number
  latestPrice: number
  latestPriceTime: Date
  delayedPrice: number
  delayedPriceTime: Date
  previousClosePrice: number
  createdAt?: Date
  updatedAt?: Date
}

export interface StockPriceRepositoryInterface {
  getAll(options?: FindOptions): Promise<StockPrice[]>
  create(values: object, options?: CreateOptions): Promise<StockPrice>
  update(values: object, options: UpdateOptions): Promise<StockPrice>
  destroy(options: DestroyOptions): Promise<boolean>
}
