import { CreateOptions, FindOptions } from 'sequelize/types'
import UserStock from '../entities/user.stock'

export interface UserStockDomainInterface {
  getAll(options?: FindOptions): Promise<UserStock[]>
  getById(id: string, options?: FindOptions): Promise<UserStock>
  create(newUserStock: UserStock, options?: CreateOptions): Promise<UserStock>
  destroy(userId: string, symbol: string): Promise<boolean>
}
