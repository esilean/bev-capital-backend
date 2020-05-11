import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import Stock from '../../../d-domain/entities/stock'
import { StockDomainInterface } from '../../../d-domain/interfaces/stock.domain.interface'
import { GetAllStockServiceInterface } from '../../interfaces/stock.service.interface'

export default class GetAllStockService extends Operation implements GetAllStockServiceInterface {
  private readonly stockDomain: StockDomainInterface

  constructor(stockDomain: StockDomainInterface) {
    super(['SUCCESS', 'ERROR'])

    this.stockDomain = stockDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(): void {
    const { SUCCESS, ERROR } = this.getEventType()

    this.stockDomain
      .getAll()
      .then((stocksFound) => {
        const stocks = stocksFound.map((stock: Stock) => {
          const { symbol, name, exchange, website, createdAt, updatedAt } = stock
          return { symbol, name, exchange, website, createdAt, updatedAt }
        })

        this.emit(SUCCESS, stocks)
      })
      .catch((error) => {
        this.emit(ERROR, error)
      })
  }
}
