import { app } from '../../setup'
import { userFactory } from '../../support/factory/user.factory'
import { stockFactory } from '../../support/factory/stock.factory'
import { userStockFactory } from '../../support/factory/user.stock.factory'
import { getToken } from '../../support/getToken'
import faker from 'faker'

describe('API -> DELETE /api/users', () => {
  describe('#destroyUser', () => {
    let token = ''
    let id = ''
    beforeEach(async () => {
      token = await getToken()
      const user = await userFactory({})
      id = user.id
    })

    it('when delete user and return status 204', async (done) => {
      const response = await app.delete(`/api/users/${id}`).set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(204)

      done()
    })

    it('when delete user that not exists and return status 404', async (done) => {
      const response = await app
        .delete('/api/users/7589290c-be32-4dba-b81c-18700d491e53')
        .set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(404)
      done()
    })

    it('when delete user that exists on stocks', async (done) => {
      const symbol = faker.random.alphaNumeric(15)
      await stockFactory({ symbol })
      await userStockFactory({ userId: id, symbol })

      const response = await app.delete(`/api/users/${id}`).set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(400)
      done()
    })

    it('when no token is provided', async (done) => {
      const response = await app.delete('/api/users/7589290c-be32-4dba-b81c-18700d491e53')

      expect(response.status).toEqual(401)
      done()
    })
  })
})
