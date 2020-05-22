import Stock from '../../../../d-domain/entities/stock'
import { StockInterface } from '../../interfaces/stock.repository.interface'
import StockPrice from '../../../../d-domain/entities/stock.prices'

export function toEntity(values: StockInterface): Stock {
  const { symbol, name, exchange, website, stockPrice, createdAt, updatedAt } = values

  const { open, close, high, low, latestPrice, latestPriceTime, delayedPrice, delayedPriceTime, previousClosePrice } = stockPrice
  const stockPriceD = new StockPrice(
    symbol,
    open,
    close,
    high,
    low,
    latestPrice,
    latestPriceTime,
    delayedPrice,
    delayedPriceTime,
    previousClosePrice
  )

  const stock = new Stock(symbol, name, exchange, website, stockPriceD, createdAt, updatedAt)

  return stock
}

export function toDB(stock: Stock): object {
  const { symbol, name, exchange, website, stockPrice } = stock

  const { open, close, high, low, latestPrice, latestPriceTime, delayedPrice, delayedPriceTime, previousClosePrice } = stockPrice

  return {
    symbol,
    name,
    exchange,
    website,
    stockPrice: { open, close, high, low, latestPrice, latestPriceTime, delayedPrice, delayedPriceTime, previousClosePrice },
  }
}
