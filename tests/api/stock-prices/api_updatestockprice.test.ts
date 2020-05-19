import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import faker from 'faker'
import { getToken } from '../../support/getToken'
import { stockPriceFactory } from '../../support/factory/stock.price.factory'

describe('API -> PUST /api/stocksprice', () => {
  describe('#updateStockPrice', () => {
    let token = ''
    let symbol = ''
    beforeEach(async () => {
      token = await getToken()

      symbol = faker.random.alphaNumeric(15)
      await stockFactory({ symbol })
      await stockPriceFactory({ symbol, previousClosePrice: 99 })
    })

    it('when updating stock price is ok', async (done) => {
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

      const response = await app.put(`/api/stocksprice/${symbol}`).set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('previousClosePrice', '1.99')

      done()
    })

    it('when no token is provided', async (done) => {
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

      const response = await app.put(`/api/stocksprice/${symbol}`).send(data)

      expect(response.status).toEqual(401)
      done()
    })
  })
})
