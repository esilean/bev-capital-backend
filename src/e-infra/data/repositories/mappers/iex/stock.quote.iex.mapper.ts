import { StockQuoteValueIEXInterface } from '../../../interfaces/iex/stock.quote.iex.repository.interface'
import StockPrice from '../../../../../d-domain/entities/stock.prices'

export function toEntity(values: StockQuoteValueIEXInterface): StockPrice {
  const { symbol, open, close, high, low, latestPrice, latestUpdate, previousClose } = values

  const stock = new StockPrice(
    symbol,
    open || 0,
    close || 0,
    high || 0,
    low || 0,
    latestPrice,
    new Date(latestUpdate * 1000),
    0,
    new Date(),
    previousClose
  )

  return stock
}
