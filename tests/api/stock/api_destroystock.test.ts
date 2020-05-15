import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import { userStockFactory } from '../../support/factory/user.stock.factory'
import { getToken } from '../../support/getToken'
import faker from 'faker'

describe('API -> DELETE /api/stocks', () => {
  describe('#destroyStock', () => {
    let token = ''
    let symbol = ''
    let symbol2 = ''
    beforeEach(async () => {
      const userId = faker.random.uuid()
      token = await getToken(userId)

      const stock = await stockFactory({})
      symbol = stock.symbol

      const stock2 = await stockFactory({})
      symbol2 = stock2.symbol

      await userStockFactory({ userId, symbol: symbol2 })
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
      const response = await app.delete(`/api/stocks/${symbol2}`).set('Authorization', `Bearer  ${token}`)

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
