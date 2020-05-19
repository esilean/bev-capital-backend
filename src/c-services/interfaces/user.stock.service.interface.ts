import UserStock from '../../d-domain/entities/user.stock'

export interface GetUserStockServiceInterface {
  execute(id: string): Promise<UserStock>
}

export interface CreateUserStockServiceInterface {
  execute(userId: string, body: UserStock): Promise<UserStock>
}

export interface DestroyUserStockServiceInterface {
  execute(userId: string, symbol: string): Promise<boolean>
}
