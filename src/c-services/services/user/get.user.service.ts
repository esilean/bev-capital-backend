import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import { UserDomainInterface } from '../../../d-domain/interfaces/user.domain.interface'
import { GetUserServiceInterface } from '../../interfaces/user.service.interface'
import User from '../../../d-domain/entities/user'
import { optUserAndStocks } from './options'

export default class GetUserService extends Operation implements GetUserServiceInterface {
  private readonly userDomain: UserDomainInterface

  constructor(userDomain: UserDomainInterface) {
    super(['SUCCESS', 'ERROR', 'NOT_FOUND'])

    this.userDomain = userDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(id: string): void {
    const { SUCCESS, ERROR, NOT_FOUND } = this.getEventType()

    this.userDomain
      .getById(id, optUserAndStocks)
      .then((userFound: User) => {
        const { id, name, email, userStocks, createdAt, updatedAt } = userFound

        const userStocksR = userStocks.map((us) => {
          const { id, symbol, qty, avgPrice, stock } = us

          const { name, exchange, website, stockPrices } = stock

          const stockPrice =
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
              return { open, close, high, low, latestPrice, latestPriceTime, delayedPrice, delayedPriceTime, previousClosePrice }
            })

          return { id, symbol, qty, avgPrice, stock: { name, exchange, website, priceToday: stockPrice[0] || {} } }
        })

        this.emit(SUCCESS, { id, name, email, stocks: userStocksR, createdAt, updatedAt })
      })
      .catch((error) => {
        if (error.name === 'NotFoundError') this.emit(NOT_FOUND, error)
        else this.emit(ERROR, error)
      })
  }
}