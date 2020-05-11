import { app, jwt } from '../../setup'
import { userFactory } from '../../support/factory/user.factory'
import { stockFactory } from '../../support/factory/stock.factory'

describe('API -> GET /api/stocks', () => {
  describe('#getAllStocks', () => {
    let token = ''
    beforeEach(async () => {
      const user = await userFactory({})
      token = jwt.signin({
        id: user.id,
        name: user.name,
        email: user.email,
      })

      await stockFactory({})
      await stockFactory({})
      await stockFactory({})
    })

    it('when there are stocks', async (done) => {
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
