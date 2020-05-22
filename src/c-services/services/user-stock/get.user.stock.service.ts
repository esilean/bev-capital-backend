import { UserStockDomainInterface } from '../../../d-domain/interfaces/user.stocks.domain.interface'
import { GetUserStockServiceInterface } from '../../interfaces/user.stock.service.interface'
import UserStock from '../../../d-domain/entities/user.stock'
import { optUserStockAndStock } from './options'

export default class GetUserStockService implements GetUserStockServiceInterface {
  private readonly userStockDomain: UserStockDomainInterface

  constructor(userStockDomain: UserStockDomainInterface) {
    this.userStockDomain = userStockDomain
  }

  async execute(id: string): Promise<UserStock> {
    const userStock = await this.userStockDomain.getById(id, optUserStockAndStock)
    return userStock
  }
}
