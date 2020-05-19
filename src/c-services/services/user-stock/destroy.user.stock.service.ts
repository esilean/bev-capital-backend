import { UserStockDomainInterface } from '../../../d-domain/interfaces/user.stocks.domain.interface'
import { DestroyUserStockServiceInterface } from '../../interfaces/user.stock.service.interface'

export default class DestroyUserStockService implements DestroyUserStockServiceInterface {
  private readonly userStockDomain: UserStockDomainInterface

  constructor(userStockDomain: UserStockDomainInterface) {
    this.userStockDomain = userStockDomain
  }

  async execute(userId: string, symbol: string): Promise<boolean> {
    const destroyed = this.userStockDomain.destroy(userId, symbol)

    return destroyed
  }
}
