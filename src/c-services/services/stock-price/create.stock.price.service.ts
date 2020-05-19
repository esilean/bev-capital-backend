import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import { CreateStockPriceServiceInterface } from '../../interfaces/stock.price.service.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'

export default class CreateStockPriceService implements CreateStockPriceServiceInterface {
  private readonly stockPriceDomain: StockPriceDomainInterface

  constructor(stockPriceDomain: StockPriceDomainInterface) {
    this.stockPriceDomain = stockPriceDomain
  }

  async execute(body: StockPrice): Promise<StockPrice> {
    const {
      symbol,
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

    const latestPriceTimeAsDate: Date = new Date(latestPriceTime)
    const delayedPriceTimeAsDate: Date = new Date(delayedPriceTime)

    const newStockPrice = new StockPrice(
      symbol,
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

    const stockPrice = await this.stockPriceDomain.create(newStockPrice)

    return stockPrice
  }
}
