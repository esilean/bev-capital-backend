import { UserStockInterface } from '../../interfaces/user.stock.repository.interface'
import UserStock from '../../../../d-domain/entities/user.stock'
import Stock from '../../../../d-domain/entities/stock'
import StockPrice from '../../../../d-domain/entities/stock.prices'

export function toEntity(values: UserStockInterface): UserStock {
  const { id, userId, symbol, qty, avgPrice, stock, createdAt, updatedAt } = values

  const userStock = new UserStock(id, userId, symbol, qty, avgPrice, createdAt, updatedAt)

  if (stock) {
    const { website, name, exchange, stockPrice } = stock

    if (stockPrice) {
      const {
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

      const stockD = new Stock(symbol, name, exchange, website, stockPriceD)
      userStock.stock = stockD
    }
  }

  return userStock
}

export function toDB(userStock: UserStock): object {
  const { userId, symbol, qty, avgPrice } = userStock
  return { userId, symbol, qty, avgPrice }
}
