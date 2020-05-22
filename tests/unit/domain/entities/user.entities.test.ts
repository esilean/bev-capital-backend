import faker from 'faker'
import { validate } from 'class-validator'
import User from '../../../../src/d-domain/entities/user'
import Stock from '../../../../src/d-domain/entities/stock'
import UserStocks from '../../../../src/d-domain/entities/user.stock'
import StockPrice from '../../../../src/d-domain/entities/stock.prices'

describe('Domain -> Entities -> User', () => {
  describe('#User', () => {
    it('when user is valid', async (done) => {
      const newUser = new User('', faker.name.firstName(), faker.internet.email(), faker.internet.password())

      validate(newUser).then((errors) => {
        expect(errors).toHaveLength(0)
        expect(newUser).toBeInstanceOf(User)
        expect(newUser).toHaveProperty('id')
        done()
      })
    })

    it('when user is valid and add stocks', async (done) => {
      const newUser = new User(
        '1231312-312321312-312312312',
        faker.name.firstName(),
        faker.internet.email(),
        faker.internet.password()
      )

      const stockPrice = new StockPrice('AAPL', 0, 0, 0, 0, 0, new Date(), 0, new Date(), 0)
      const stock = new Stock('AAPL', 'Apple', 'NASDAQ', 'apple.com', stockPrice)
      const userStock = new UserStocks('', newUser.id, stock.symbol, 0, 0)
      userStock.stock = stock
      newUser.userStocks = [userStock]
      validate(newUser).then((errors) => {
        expect(errors).toHaveLength(0)
        expect(newUser).toBeInstanceOf(User)
        expect(newUser).toHaveProperty('id')
        done()
      })
    })
  })
})
