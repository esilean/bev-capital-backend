import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import { stockPriceFactory } from '../../support/factory/stock.price.factory'
import { getToken } from '../../support/getToken'
import faker from 'faker'

describe('API -> DELETE /api/stocksprice', () => {
  describe('#destroyStockPrice', () => {
    let token = ''

    beforeEach(async () => {
      token = await getToken()
    })

    it('when delete stock price and return status 204', async (done) => {
      const symbol = faker.random.alphaNumeric(15)
      await stockFactory({ symbol })
      await stockPriceFactory({ symbol, datePrice: new Date(2020, 1, 1) })

      const response = await app.delete(`/api/stocksprice/${symbol}/2020-02-01`).set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(204)

      done()
    })

    it('when delete stock that not exists and return status 404', async (done) => {
      const response = await app.delete('/api/stocksprice/XYZ/1900-01-01').set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(404)
      done()
    })

    it('when no token is provided', async (done) => {
      const response = await app.delete('/api/stocksprice/AAV/2020-01-01')

      expect(response.status).toEqual(401)
      done()
    })
  })
})
