import { CreateUserStockServiceInterface } from '../../interfaces/user.stock.service.interface'
import { UserStockDomainInterface } from '../../../d-domain/interfaces/user.stocks.domain.interface'
import UserStock from '../../../d-domain/entities/user.stock'

export default class CreateUserStockService implements CreateUserStockServiceInterface {
  private readonly userStockDomain: UserStockDomainInterface

  constructor(userStockDomain: UserStockDomainInterface) {
    this.userStockDomain = userStockDomain
  }

  async execute(userId: string, body: UserStock): Promise<UserStock> {
    const { symbol, qty, avgPrice } = body
    const newUserStock = new UserStock('', userId, symbol, qty, avgPrice)

    const userStock = await this.userStockDomain.create(newUserStock)

    return userStock
  }
}
