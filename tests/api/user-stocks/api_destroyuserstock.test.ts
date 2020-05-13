import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import { userStockFactory } from '../../support/factory/user.stock.factory'
import { getToken } from '../../support/getToken'
import faker from 'faker'

describe('API -> DELETE /api/usersstock', () => {
  describe('#destroyUserStock', () => {
    it('when delete user stock and return status 204', async (done) => {
      const fakeUserId = faker.random.uuid()
      const token = await getToken(fakeUserId)

      const stock = await stockFactory({})

      await userStockFactory({ userId: fakeUserId, symbol: stock.symbol })

      const response = await app.delete(`/api/usersstock/${stock.symbol}`).set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(204)

      done()
    })

    it('when delete user stock that not exists and return status 404', async (done) => {
      const fakeUserId = faker.random.uuid()
      const token = await getToken(fakeUserId)

      const response = await app.delete('/api/usersstock/FAKESTOCK').set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(404)
      done()
    })

    it('when no token is provided', async (done) => {
      const response = await app.delete('/api/usersstock/AAPL')

      expect(response.status).toEqual(401)
      done()
    })
  })
})
