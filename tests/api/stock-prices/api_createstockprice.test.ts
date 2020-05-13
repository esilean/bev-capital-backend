import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import faker from 'faker'
import { getToken } from '../../support/getToken'
import { stockPriceFactory } from '../../support/factory/stock.price.factory'

describe('API -> POST /api/stocksprice', () => {
  describe('#createStockPrice', () => {
    let token = ''
    beforeEach(async () => {
      token = await getToken()
    })

    it('when creating stock price is ok', async (done) => {
      const symbol = faker.random.alphaNumeric(15)
      await stockFactory({ symbol })

      const data = {
        symbol,
        datePrice: new Date(faker.date.recent()),
        open: faker.random.number(),
        close: faker.random.number(),
        high: faker.random.number(),
        low: faker.random.number(),
        latestPrice: faker.random.number(),
        latestPriceTime: new Date(faker.date.recent()),
        delayedPrice: faker.random.number(),
        delayedPriceTime: new Date(faker.date.recent()),
        previousClosePrice: faker.random.number(),
      }

      const response = await app.post('/api/stocksprice').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(201)
      expect(response.body).toHaveProperty('symbol')

      done()
    })

    it('when stock data is missing', async (done) => {
      const data = {
        datePrice: new Date(faker.date.recent()),
        open: faker.finance.amount(),
        close: faker.finance.amount(),
        high: faker.finance.amount(),
        low: faker.finance.amount(),
        latestPrice: faker.finance.amount(),
        latestPriceTime: faker.date.recent(),
        delayedPrice: faker.finance.amount(),
        delayedPriceTime: faker.date.recent(),
        previousClosePrice: faker.finance.amount(),
      }

      const response = await app.post('/api/stocksprice').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(400)
      done()
    })

    it('when stock price already exists', async (done) => {
      const symbol = faker.random.alphaNumeric(15)
      await stockFactory({ symbol })
      await stockPriceFactory({ symbol, datePrice: new Date(1999, 1, 1) })

      const data = {
        symbol,
        datePrice: new Date(1999, 1, 1),
        open: faker.random.number(),
        close: faker.random.number(),
        high: faker.random.number(),
        low: faker.random.number(),
        latestPrice: faker.random.number(),
        latestPriceTime: new Date(faker.date.recent()),
        delayedPrice: faker.random.number(),
        delayedPriceTime: new Date(faker.date.recent()),
        previousClosePrice: faker.random.number(),
      }

      const response = await app.post('/api/stocksprice').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(400)
      done()
    })

    it('when no token is provided', async (done) => {
      const data = {
        symbol: 'AAAAAA',
      }

      const response = await app.post('/api/stocksprice').send(data)

      expect(response.status).toEqual(401)
      done()
    })
  })
})
