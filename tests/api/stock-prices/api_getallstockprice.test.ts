import { app, jwt } from '../../setup'
import { userFactory } from '../../support/factory/user.factory'
import { stockFactory } from '../../support/factory/stock.factory'
import { stockPriceFactory } from '../../support/factory/stock.price.factory'

describe('API -> GET /api/stocksprice', () => {
  describe('#getAllStockPrices', () => {
    let token = ''
    beforeEach(async () => {
      const user = await userFactory({})
      token = jwt.signin({
        id: user.id,
        name: user.name,
        email: user.email,
      })

      await stockFactory({ symbol: 'TWER' })
      await stockPriceFactory({ symbol: 'TWER' })
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
