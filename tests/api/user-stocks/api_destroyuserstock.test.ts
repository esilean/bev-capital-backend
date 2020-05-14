import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import { userStockFactory } from '../../support/factory/user.stock.factory'
import { getToken } from '../../support/getToken'
import faker from 'faker'

describe('API -> DELETE /api/usersstock', () => {

  describe('#destroyUserStock', () => {

    let token = ''
    let userId = ''
    let symbol = ''
    beforeEach(async () => {
      userId = faker.random.uuid()
      token = await getToken(userId)
      const stock = await stockFactory({})      
      await userStockFactory({ userId: userId, symbol: stock.symbol })
      symbol = stock.symbol
    })


    it('when delete user stock and return status 204', async (done) => {
      const response = await app.delete(`/api/usersstock/${symbol}`).set('Authorization', `Bearer  ${token}`)
      expect(response.status).toEqual(204)
      done()
    })

    it('when delete user stock that not exists and return status 404', async (done) => {

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
