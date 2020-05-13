import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import { getToken } from '../../support/getToken'

describe('API -> GET /api/stocks', () => {
  describe('#getAllStocks', () => {
    let token = ''
    beforeEach(async () => {
      token = await getToken()
    })

    it('when there are stocks', async (done) => {
      await stockFactory({})

      const response = await app.get('/api/stocks').set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(200)
      expect(response.body.length).toBeGreaterThan(0)
      done()
    })

    it('when no token is provided', async (done) => {
      const response = await app.get('/api/stocks')

      expect(response.status).toEqual(401)
      done()
    })
  })
})
