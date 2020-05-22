import StockPrice from '../../../../../d-domain/entities/stock.prices'
import { StockQuoteFinnhubInterface } from '../../../interfaces/finnhub/stock.quote.finnhub.repository.interface'

export function toEntity(symbol: string, values: StockQuoteFinnhubInterface): StockPrice {
  const { o, c, h, l, pc, t } = values

  const latestPriceTime = new Date(0)
  latestPriceTime.setUTCSeconds(t)

  const stock = new StockPrice(symbol, o || 0, c || 0, h || 0, l || 0, c || 0, latestPriceTime, 0, new Date(), pc || 0)

  return stock
}
