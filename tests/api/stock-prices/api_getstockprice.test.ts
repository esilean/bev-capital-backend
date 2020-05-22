import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import { getToken } from '../../support/getToken'
import faker from 'faker'

describe('API -> GET /api/stocksprice/:symbol', () => {
  describe('#getStockPrice', () => {
    let token = ''
    let symbol = ''
    beforeEach(async () => {
      token = await getToken()

      symbol = faker.random.alphaNumeric(15)
      await stockFactory({ symbol })
    })

    it('when there is stock price', async (done) => {
      const response = await app.get(`/api/stocksprice/${symbol}`).set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('symbol', symbol)

      done()
    })

    it('when no token is provided', async (done) => {
      const response = await app.get('/api/stocksprice/AWR')

      expect(response.status).toEqual(401)
      done()
    })
  })
})
