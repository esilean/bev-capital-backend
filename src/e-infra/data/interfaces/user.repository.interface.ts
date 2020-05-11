import { FindOptions, CreateOptions } from 'sequelize/types'
import User from '../../../d-domain/entities/user'
import { UserStockInterface } from './user.stock.repository.interface'

export interface UserInterface {
  id?: string
  name: string
  email: string
  password: string
  userStocks: UserStockInterface[]
  createdAt?: Date
  updatedAt?: Date
}

export interface UserRepositoryInterface {
  getAll(options?: FindOptions): Promise<User[]>
  getById(id: string, options?: FindOptions): Promise<User>
  create(values?: object, options?: CreateOptions): Promise<User>
  destroy(id: string): Promise<boolean>
}
