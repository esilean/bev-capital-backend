import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import faker from 'faker'
import { getToken } from '../../support/getToken'

describe('API -> POST /api/stocks', () => {
  describe('#createStock', () => {
    let token = ''
    beforeEach(async () => {
      token = await getToken()
    })

    it('when creating stock is ok', async (done) => {
      const data = {
        symbol: faker.random.alphaNumeric(15),
        name: faker.random.word(),
        exchange: faker.random.word(),
        website: faker.internet.url(),
      }

      const response = await app.post('/api/stocks').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(201)
      expect(response.body).toHaveProperty('symbol')

      done()
    })

    it('when stock data is missing', async (done) => {
      const data = {
        exchange: faker.random.word(),
        website: faker.internet.url(),
      }

      const response = await app.post('/api/stocks').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(400)
      done()
    })

    it('when symbol already exists', async (done) => {
      const stock = await stockFactory({})
      const symbol = stock.symbol

      const data = {
        symbol,
        name: faker.random.word(),
        exchange: faker.random.word(),
        website: faker.internet.url(),
      }

      const response = await app.post('/api/stocks').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(400)
      done()
    })

    it('when no token is provided', async (done) => {
      const data = {
        symbol: 'ASD',
        name: faker.random.word(),
        exchange: faker.random.word(),
        website: faker.internet.url(),
      }

      const response = await app.post('/api/stocks').send(data)

      expect(response.status).toEqual(401)
      done()
    })
  })
})
