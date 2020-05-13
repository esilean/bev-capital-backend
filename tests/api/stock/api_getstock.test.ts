import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import { getToken } from '../../support/getToken'

describe('API -> GET /api/stocks', () => {
  describe('#getStock', () => {
    let token = ''
    let symbol = ''
    beforeEach(async () => {
      token = await getToken()

      const stock = await stockFactory({})
      symbol = stock.symbol
    })

    it('when there is stock', async (done) => {
      const response = await app.get(`/api/stocks/${symbol}`).set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('symbol')

      done()
    })

    it('when there is not stock', async (done) => {
      const response = await app.get('/api/stocks/APPL2').set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(404)
      done()
    })

    it('when no token is provided', async (done) => {
      const response = await app.get(`/api/stocks/${symbol}`)

      expect(response.status).toEqual(401)
      done()
    })
  })
})
