import UserStock from '../../../d-domain/entities/user.stock'
import { UserStockDomainInterface } from '../../../d-domain/interfaces/user.stocks.domain.interface'
import { GetAllUserStockServiceInterface } from '../../interfaces/user.stock.service.interface'

export default class GetAllUserStockService implements GetAllUserStockServiceInterface {
  private readonly userStockDomain: UserStockDomainInterface

  constructor(userStockDomain: UserStockDomainInterface) {
    this.userStockDomain = userStockDomain
  }

  async execute(): Promise<UserStock[]> {
    const usersStocks = await this.userStockDomain.getAll()

    return usersStocks
  }
}
