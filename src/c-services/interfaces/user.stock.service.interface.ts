import { OperationInterface } from './operation.interface'
import UserStock from '../../d-domain/entities/user.stock'

export interface GetUserStockServiceInterface extends OperationInterface {
  execute(id: string): void
}

export interface CreateUserStockServiceInterface extends OperationInterface {
  execute(userId: string, body: UserStock): void
}

export interface DestroyUserStockServiceInterface extends OperationInterface {
  execute(userId: string, symbol: string): void
}
