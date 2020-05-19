import StockPrice from '../../../../../d-domain/entities/stock.prices'
import { StockBatchIEXInterface } from '../../../interfaces/iex/stock.quote.iex.repository.interface'

export function toEntity(symbols: string[], values: StockBatchIEXInterface): StockPrice[] {
  const stocks = symbols.map(function (sym) {
    const { symbol, open, close, high, low, latestPrice, latestUpdate, previousClose } = values[sym].quote

    const latestPriceTime = new Date(0)
    latestPriceTime.setUTCMilliseconds(latestUpdate)

    const sp = new StockPrice(
      symbol,
      open || 0,
      close || 0,
      high || 0,
      low || 0,
      latestPrice,
      latestPriceTime,
      0,
      new Date(),
      previousClose
    )

    return sp
  })

  return stocks
}
