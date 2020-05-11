import { UserStockDomainInterface } from '../../../d-domain/interfaces/user.stocks.domain.interface'
import { GetUserStockServiceInterface } from '../../interfaces/user.stock.service.interface'
import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import UserStock from '../../../d-domain/entities/user.stock'

export default class GetUserStockService extends Operation implements GetUserStockServiceInterface {
  private readonly userStockDomain: UserStockDomainInterface

  constructor(userStockDomain: UserStockDomainInterface) {
    super(['SUCCESS', 'ERROR', 'NOT_FOUND'])

    this.userStockDomain = userStockDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(id: string): void {
    const { SUCCESS, ERROR, NOT_FOUND } = this.getEventType()

    this.userStockDomain
      .getById(id)
      .then((userStock: UserStock) => {
        const { id, userId, symbol, qty, avgPrice, createdAt, updatedAt } = userStock
        this.emit(SUCCESS, {
          id,
          userId,
          symbol,
          qty,
          avgPrice,
          createdAt,
          updatedAt,
        })
      })
      .catch((error) => {
        if (error.name === 'NotFoundError') this.emit(NOT_FOUND, error)
        else this.emit(ERROR, error)
      })
  }
}
