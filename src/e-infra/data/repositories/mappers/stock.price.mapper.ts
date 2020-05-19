import StockPrice from '../../../../d-domain/entities/stock.prices'
import { StockPriceInterface } from '../../interfaces/stock.price.repository.interface'

export function toEntity(values: StockPriceInterface): StockPrice {
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
    createdAt,
    updatedAt,
  } = values

  const stock = new StockPrice(
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
    createdAt,
    updatedAt
  )

  return stock
}

export function toDB(stockPrice: StockPrice): object {
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
  } = stockPrice

  return {
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
  }
}
