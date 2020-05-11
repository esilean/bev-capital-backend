import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import faker from 'faker'
import { getToken } from '../../support/getToken'
import { stockPriceFactory } from '../../support/factory/stock.price.factory'

describe('API -> PUST /api/stocksprice', () => {
  describe('#updateStockPrice', () => {
    let token = ''
    beforeEach(async () => {
      token = await getToken()
    })

    it('when updating stock price is ok', async (done) => {
      const symbol = faker.lorem.word()
      await stockFactory({ symbol })
      await stockPriceFactory({ symbol, datePrice: new Date(1999, 5, 1), previousClosePrice: 99 })

      const data = {
        open: faker.random.number(),
        close: faker.random.number(),
        high: faker.random.number(),
        low: faker.random.number(),
        latestPrice: faker.random.number(),
        latestPriceTime: new Date(faker.date.recent()),
        delayedPrice: faker.random.number(),
        delayedPriceTime: new Date(faker.date.recent()),
        previousClosePrice: 1.99,
      }

      const response = await app.put(`/api/stocksprice/${symbol}/1999-06-01`).set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('previousClosePrice', '1.99')
      done()
    })

    it('when no token is provided', async (done) => {
      const symbol = faker.lorem.word()
      await stockFactory({ symbol })
      await stockPriceFactory({ symbol, datePrice: new Date(1999, 5, 1), previousClosePrice: 99 })

      const data = {
        open: faker.random.number(),
        close: faker.random.number(),
        high: faker.random.number(),
        low: faker.random.number(),
        latestPrice: faker.random.number(),
        latestPriceTime: new Date(faker.date.recent()),
        delayedPrice: faker.random.number(),
        delayedPriceTime: new Date(faker.date.recent()),
        previousClosePrice: 1.99,
      }

      const response = await app.put(`/api/stocksprice/${symbol}/1999-06-01`).send(data)

      expect(response.status).toEqual(401)
      done()
    })
  })
})
