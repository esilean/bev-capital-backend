import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import { stockPriceFactory } from '../../support/factory/stock.price.factory'
import { getToken } from '../../support/getToken'
import faker from 'faker'

describe('API -> GET /api/stocksprice', () => {
  describe('#getAllStockPrices', () => {
    let token = ''
    beforeEach(async () => {
      token = await getToken()

      const symbol = faker.random.alphaNumeric(15)
      await stockFactory({ symbol })
      await stockPriceFactory({ symbol })      
    })

    it('when there are stock prices', async (done) => {
      const response = await app.get('/api/stocksprice').set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(200)
      expect(response.body.length).toBeGreaterThan(0)

      done()
    })

    it('when no token is provided', async (done) => {
      const response = await app.get('/api/stocksprice')

      expect(response.status).toEqual(401)
      done()
    })
  })
})
