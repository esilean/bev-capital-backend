import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import Stock from '../../../d-domain/entities/stock'
import { StockDomainInterface } from '../../../d-domain/interfaces/stock.domain.interface'
import { GetStockServiceInterface } from '../../interfaces/stock.service.interface'

export default class GetStockService extends Operation implements GetStockServiceInterface {
  private readonly stockDomain: StockDomainInterface

  constructor(stockDomain: StockDomainInterface) {
    super(['SUCCESS', 'ERROR', 'NOT_FOUND'])

    this.stockDomain = stockDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(symbol: string): void {
    const { SUCCESS, ERROR, NOT_FOUND } = this.getEventType()

    this.stockDomain
      .getBySymbol(symbol)
      .then((stock: Stock) => {
        const { symbol, name, exchange, website, createdAt, updatedAt } = stock
        this.emit(SUCCESS, {
          symbol,
          name,
          exchange,
          website,
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
