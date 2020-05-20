import { FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from 'sequelize/types'
import StockPrice from '../entities/stock.prices'

export interface StockPriceDomainInterface {
  getAll(options?: FindOptions): Promise<StockPrice[]>
  create(newStockPrice: StockPrice, options?: CreateOptions): Promise<StockPrice>
  update(newStockPrice: StockPrice, options: UpdateOptions): Promise<StockPrice>
  destroy(options: DestroyOptions): Promise<boolean>
}
