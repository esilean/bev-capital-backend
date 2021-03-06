import { FindOptions, CreateOptions, DestroyOptions } from 'sequelize/types'
import Stock from '../../../d-domain/entities/stock'
import { StockPriceInterface } from './stock.price.repository.interface'

export interface StockInterface {
  symbol: string
  name: string
  exchange: string
  website: string
  stockPrice: StockPriceInterface
  createdAt?: Date
  updatedAt?: Date
}

export interface StockRepositoryInterface {
  getAll(options?: FindOptions): Promise<Stock[]>
  getBySymbol(symbol: string, options?: FindOptions): Promise<Stock>
  create(values?: object, options?: CreateOptions): Promise<Stock>
  destroy(options: DestroyOptions): Promise<boolean>
}
