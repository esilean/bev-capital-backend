import { CreateStockServiceInterface } from '../../interfaces/stock.service.interface'
import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import Stock from '../../../d-domain/entities/stock'
import { StockDomainInterface } from '../../../d-domain/interfaces/stock.domain.interface'

export default class CreateStockService extends Operation implements CreateStockServiceInterface {
  private readonly stockDomain: StockDomainInterface

  constructor(stockDomain: StockDomainInterface) {
    super(['SUCCESS', 'ERROR', 'VALIDATION_ERROR'])

    this.stockDomain = stockDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(body: Stock): void {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.getEventType()

    const { symbol, name, exchange, website } = body
    const newStock = new Stock(symbol, name, exchange, website)

    this.stockDomain
      .create(newStock)
      .then((stock) => {
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
      .catch((error: Error) => {
        if (error.name === 'ValidationError') this.emit(VALIDATION_ERROR, error)
        else this.emit(ERROR, error)
      })
  }
}
