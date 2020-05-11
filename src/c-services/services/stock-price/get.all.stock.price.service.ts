import { GetAllStockPriceServiceInterface } from '../../interfaces/stock.price.service.interface'
import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'
import { optStockPrices } from './options'

export default class GetAllStockPriceService extends Operation implements GetAllStockPriceServiceInterface {
  private readonly stockPriceDomain: StockPriceDomainInterface

  constructor(stockPriceDomain: StockPriceDomainInterface) {
    super(['SUCCESS', 'ERROR'])

    this.stockPriceDomain = stockPriceDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(): void {
    const { SUCCESS, ERROR } = this.getEventType()

    this.stockPriceDomain
      .getAll(optStockPrices)
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

        this.emit(SUCCESS, stockPrices)
      })
      .catch((error) => {
        this.emit(ERROR, error)
      })
  }
}
