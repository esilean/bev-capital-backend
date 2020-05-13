import { GetAllUserServiceInterface } from '../../interfaces/user.service.interface'

import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import { UserDomainInterface } from '../../../d-domain/interfaces/user.domain.interface'
import { optUserAndStocks } from './options'

export default class GetAllUserService extends Operation implements GetAllUserServiceInterface {
  private readonly userDomain: UserDomainInterface

  constructor(userDomain: UserDomainInterface) {
    super(['SUCCESS', 'ERROR'])

    this.userDomain = userDomain
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(): void {
    const { SUCCESS, ERROR } = this.getEventType()

    this.userDomain
      .getAll(optUserAndStocks)
      .then((usersFound) => {
        const users = usersFound.map((user) => {
          const { id, name, email, userStocks, createdAt, updatedAt } = user

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
                return {
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
              })

            return { id, symbol, qty, avgPrice, stock: { name, exchange, website, priceToday: stockPrice[0] || {} } }
          })

          return { id, name, email, stocks: userStocksR, createdAt, updatedAt }
        })

        this.emit(SUCCESS, users)
      })
      .catch((error) => {
        this.emit(ERROR, error)
      })
  }
}
