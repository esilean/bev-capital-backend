import { EventTypeInterface } from '../../interfaces/operation.interface'
import { UserStockDomainInterface } from '../../../d-domain/interfaces/user.stocks.domain.interface'
import Operation from '../../operation'
import { DestroyUserStockServiceInterface } from '../../interfaces/user.stock.service.interface'

export default class DestroyUserStockService extends Operation implements DestroyUserStockServiceInterface {
  private readonly userStockDomain: UserStockDomainInterface

  constructor(userStockDomain: UserStockDomainInterface) {
    super(['SUCCESS', 'ERROR', 'NOT_FOUND'])

    this.userStockDomain = userStockDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(userId: string, symbol: string): void {
    const { SUCCESS, ERROR, NOT_FOUND } = this.getEventType()

    this.userStockDomain
      .destroy(userId, symbol)
      .then((destroyed) => {
        if (destroyed) this.emit(SUCCESS, null)
        else this.emit(NOT_FOUND, null)
      })
      .catch((error) => {
        this.emit(ERROR, error)
      })
  }
}
