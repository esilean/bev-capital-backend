import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'
import { UpdateStockPriceServiceInterface } from '../../interfaces/stock.price.service.interface'

export default class UpdateStockPriceService implements UpdateStockPriceServiceInterface {
  private readonly stockPriceDomain: StockPriceDomainInterface

  constructor(stockPriceDomain: StockPriceDomainInterface) {
    this.stockPriceDomain = stockPriceDomain
  }

  async execute(symbol: string, body: StockPrice): Promise<StockPrice> {
    const { open, close, high, low, latestPrice, latestPriceTime, delayedPrice, delayedPriceTime, previousClosePrice } = body

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

    const stockPrice = await this.stockPriceDomain.update(newStockPrice, { where: { symbol } })

    return stockPrice
  }
}
