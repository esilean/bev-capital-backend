import { GetStockPriceServiceInterface } from '../../interfaces/stock.price.service.interface'
import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'
import { optOneStockPrice } from './options'
import { NotFoundError } from '../../../e-infra/cross-cutting/utils/errors/error.handler'

export default class GetStockPriceService extends Operation implements GetStockPriceServiceInterface {
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

    //convert to instance of Date()
    let datePriceAsDate: Date = new Date(datePrice)
    datePriceAsDate = new Date(datePriceAsDate.getUTCFullYear(), datePriceAsDate.getUTCMonth(), datePriceAsDate.getUTCDate())

    this.stockPriceDomain
      .getAll(optOneStockPrice(symbol, datePriceAsDate))
      .then((stockPricesFound: StockPrice[]) => {
        const stockPrices = stockPricesFound.map((stockPrice: StockPrice) => {
          const {
            symbol,
            datePrice,
            open,
            close,
            high,
            low,
            latestPrice,
            latestPriceTime,
            delayedPrice,
            delayedPriceTime,
            previousClosePrice,
            createdAt,
            updatedAt,
          } = stockPrice
          return {
            symbol,
            datePrice,
            open,
            close,
            high,
            low,
            latestPrice,
            latestPriceTime,
            delayedPrice,
            delayedPriceTime,
            previousClosePrice,
            createdAt,
            updatedAt,
          }
        })

        if (stockPrices[0]) this.emit(SUCCESS, stockPrices[0])
        else this.emit(NOT_FOUND, new NotFoundError('Stock Price cannot be found'))
      })
      .catch((error) => {
        this.emit(ERROR, error)
      })
  }
}
