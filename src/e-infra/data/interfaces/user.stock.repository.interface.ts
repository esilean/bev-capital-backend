import { FindOptions, CreateOptions } from 'sequelize/types'
import UserStock from '../../../d-domain/entities/user.stock'
import { StockInterface } from './stock.repository.interface'

export interface UserStockInterface {
  id?: string
  userId: string
  symbol: string
  qty: number
  avgPrice: number
  stock: StockInterface
  createdAt?: Date
  updatedAt?: Date
}

export interface UserStockRepositoryInterface {
  getAll(options?: FindOptions): Promise<UserStock[]>
  getById(id: string, options?: FindOptions): Promise<UserStock>
  create(values: object, options?: CreateOptions): Promise<UserStock>
  destroy(userId: string, symbol: string): Promise<boolean>
}
