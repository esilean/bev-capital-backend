import Operation from '../../operation'
import { CreateUserStockServiceInterface } from '../../interfaces/user.stock.service.interface'
import { UserStockDomainInterface } from '../../../d-domain/interfaces/user.stocks.domain.interface'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import UserStock from '../../../d-domain/entities/user.stock'

export default class CreateUserStockService extends Operation implements CreateUserStockServiceInterface {
  private readonly userStockDomain: UserStockDomainInterface

  constructor(userStockDomain: UserStockDomainInterface) {
    super(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND'])

    this.userStockDomain = userStockDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(userId: string, body: UserStock): void {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.getEventType()

    const { symbol, qty, avgPrice } = body
    const newUserStock = new UserStock('', userId, symbol, qty, avgPrice)

    this.userStockDomain
      .create(newUserStock)
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
      .catch((error: Error) => {
        if (error.name === 'ValidationError') this.emit(VALIDATION_ERROR, error)
        else if (error.name === 'NotFoundError') this.emit(NOT_FOUND, error)
        else this.emit(ERROR, error)
      })
  }
}
