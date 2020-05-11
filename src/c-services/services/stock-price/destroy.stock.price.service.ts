import { EventTypeInterface } from '../../interfaces/operation.interface'
import Operation from '../../operation'
import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import { DestroyStockPriceServiceInterface } from '../../interfaces/stock.price.service.interface'

export default class DestroyStockPriceService extends Operation implements DestroyStockPriceServiceInterface {
  private readonly stockPriceDomain: StockPriceDomainInterface

  constructor(stockPriceDomain: StockPriceDomainInterface) {
    super(['SUCCESS', 'ERROR', 'NOT_FOUND'])

    this.stockPriceDomain = stockPriceDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(symbol: string, datePrice: string): void {
    const { SUCCESS, ERROR, NOT_FOUND } = this.getEventType()

    let datePriceAsDate: Date = new Date(datePrice)
    datePriceAsDate = new Date(datePriceAsDate.getUTCFullYear(), datePriceAsDate.getUTCMonth(), datePriceAsDate.getUTCDate())

    this.stockPriceDomain
      .destroy(symbol, datePriceAsDate)
      .then((destroyed) => {
        if (destroyed) this.emit(SUCCESS, null)
        else this.emit(NOT_FOUND, null)
      })
      .catch((error) => {
        this.emit(ERROR, error)
      })
  }
}
