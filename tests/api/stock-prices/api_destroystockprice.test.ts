import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import { stockPriceFactory } from '../../support/factory/stock.price.factory'
import { getToken } from '../../support/getToken'
import faker from 'faker'

describe('API -> DELETE /api/stocksprice', () => {
  describe('#destroyStockPrice', () => {
    let token = ''
    let symbol = ''
    beforeEach(async () => {
      token = await getToken()

      symbol = faker.random.alphaNumeric(15)
      await stockFactory({ symbol })
      await stockPriceFactory({ symbol })
    })

    it('when delete stock price and return status 204', async (done) => {
      const response = await app.delete(`/api/stocksprice/${symbol}`).set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(204)

      done()
    })

    it('when delete stock that not exists and return status 404', async (done) => {
      const response = await app.delete('/api/stocksprice/XYZ').set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(404)
      done()
    })

    it('when no token is provided', async (done) => {
      const response = await app.delete('/api/stocksprice/AAV')

      expect(response.status).toEqual(401)
      done()
    })
  })
})
