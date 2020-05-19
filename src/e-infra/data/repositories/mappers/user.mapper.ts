import User from '../../../../d-domain/entities/user'
import { UserInterface } from '../../interfaces/user.repository.interface'
import UserStock from '../../../../d-domain/entities/user.stock'
import Stock from '../../../../d-domain/entities/stock'
import StockPrice from '../../../../d-domain/entities/stock.prices'

export function toEntity(values: UserInterface): User {
  const { id, name, email, password, userStocks, createdAt, updatedAt } = values

  let userStocksD: UserStock[] = []
  userStocksD =
    userStocks &&
    userStocks.map((us) => {
      const { id, userId, symbol, qty, avgPrice, stock, createdAt, updatedAt } = us

      const userStock = new UserStock(id, userId, symbol, qty, avgPrice, createdAt, updatedAt)

      const { website, name, exchange, stockPrices } = stock
      const stockD = new Stock(symbol, name, exchange, website)

      const stockPricesD: StockPrice[] =
        stockPrices &&
        stockPrices.map((sp) => {
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
          } = sp
          const stockPrice = new StockPrice(
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
          return stockPrice
        })
      stockD.stockPrices = stockPricesD

      userStock.stock = stockD

      return userStock
    })

  const user = new User(id, name, email, password, createdAt, updatedAt)
  user.userStocks = userStocksD

  return user
}

export function toDB(user: User): object {
  const { name, email, password } = user
  return { name, email, password }
}
