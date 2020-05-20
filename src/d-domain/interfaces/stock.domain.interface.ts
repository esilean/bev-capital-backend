import { FindOptions, CreateOptions, DestroyOptions } from 'sequelize/types'
import Stock from '../entities/stock'

export interface StockDomainInterface {
  getAll(options?: FindOptions): Promise<Stock[]>
  getBySymbol(symbol: string, options?: FindOptions): Promise<Stock>
  create(newStock: Stock, options?: CreateOptions): Promise<Stock>
  destroy(options: DestroyOptions): Promise<boolean>
}
