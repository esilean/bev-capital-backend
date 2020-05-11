import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import { StockDomainInterface } from '../../../d-domain/interfaces/stock.domain.interface'
import { DestroyStockServiceInterface } from '../../interfaces/stock.service.interface'

export default class DestroyStockService extends Operation implements DestroyStockServiceInterface {
  private readonly stockDomain: StockDomainInterface

  constructor(stockDomain: StockDomainInterface) {
    super(['SUCCESS', 'ERROR', 'NOT_FOUND', 'VALIDATION_ERROR'])

    this.stockDomain = stockDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(symbol: string): void {
    const { SUCCESS, ERROR, NOT_FOUND, VALIDATION_ERROR } = this.getEventType()

    this.stockDomain
      .destroy(symbol)
      .then((destroyed) => {
        if (destroyed) this.emit(SUCCESS, null)
        else this.emit(NOT_FOUND, null)
      })
      .catch((error) => {
        if (error.name === 'ValidationError') this.emit(VALIDATION_ERROR, error)
        else this.emit(ERROR, error)
      })
  }
}
