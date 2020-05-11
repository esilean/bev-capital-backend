import Operation from '../../operation'

import { EventTypeInterface } from '../../interfaces/operation.interface'
import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import { CreateStockPriceServiceInterface } from '../../interfaces/stock.price.service.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'

export default class CreateStockPriceService extends Operation implements CreateStockPriceServiceInterface {
  private readonly stockPriceDomain: StockPriceDomainInterface

  constructor(stockPriceDomain: StockPriceDomainInterface) {
    super(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND'])

    this.stockPriceDomain = stockPriceDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(body: StockPrice): void {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.getEventType()

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
    } = body

    //convert to instance of Date()
    let datePriceAsDate: Date = new Date(datePrice)
    datePriceAsDate = new Date(datePriceAsDate.getUTCFullYear(), datePriceAsDate.getUTCMonth(), datePriceAsDate.getUTCDate())
    const latestPriceTimeAsDate: Date = new Date(latestPriceTime)
    const delayedPriceTimeAsDate: Date = new Date(delayedPriceTime)

    const newStockPrice = new StockPrice(
      symbol,
      datePriceAsDate,
      open,
      close,
      high,
      low,
      latestPrice,
      latestPriceTimeAsDate,
      delayedPrice,
      delayedPriceTimeAsDate,
      previousClosePrice
    )

    this.stockPriceDomain
      .create(newStockPrice)
      .then((stockPrice: StockPrice) => {
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
        this.emit(SUCCESS, {
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
        })
      })
      .catch((error: Error) => {
        if (error.name === 'ValidationError') this.emit(VALIDATION_ERROR, error)
        else if (error.name === 'NotFoundError') this.emit(NOT_FOUND, error)
        else this.emit(ERROR, error)
      })
  }
}
