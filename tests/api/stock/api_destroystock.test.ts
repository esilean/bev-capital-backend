import { app, jwt } from '../../setup'
import { userFactory } from '../../support/factory/user.factory'
import { stockFactory } from '../../support/factory/stock.factory'
import { userStockFactory } from '../../support/factory/user.stock.factory'

describe('API -> DELETE /api/stocks', () => {
  describe('#destroyStock', () => {
    let token = ''
    let symbol = ''
    let userId = ''
    beforeEach(async () => {
      const user = await userFactory({})
      userId = user.id
      token = jwt.signin({
        id: user.id,
        name: user.name,
        email: user.email,
      })

      const stock = await stockFactory({})
      symbol = stock.symbol
    })

    it('when delete stock and return status 204', async (done) => {
      const response = await app.delete(`/api/stocks/${symbol}`).set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(204)
      done()
    })

    it('when delete stock that not exists and return status 404', async (done) => {
      const response = await app.delete('/api/stocks/AAPL2').set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(404)
      done()
    })

    it('when delete stock that exists on users', async (done) => {
      await userStockFactory({ userId, symbol })

      const response = await app.delete(`/api/stocks/${symbol}`).set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(400)
      done()
    })

    it('when no token is provided', async (done) => {
      const response = await app.delete('/api/stocks/AAPL')

      expect(response.status).toEqual(401)
      done()
    })
  })
})
