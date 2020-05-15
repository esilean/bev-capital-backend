import { app } from '../../setup'
import { userFactory } from '../../support/factory/user.factory'
import { getToken } from '../../support/getToken'
import faker from 'faker'

describe('API -> GET /api/users/:id', () => {
  describe('#getUser', () => {
    let token = ''
    let id = ''
    beforeEach(async () => {
      token = await getToken()

      id = faker.random.word()
      await userFactory({ id })
    })

    it('when there is user', async (done) => {
      const response = await app.get(`/api/users/${id}`).set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('id')
      expect(response.body).toHaveProperty('stocks')

      done()
    })

    it('when there is no user', async (done) => {
      const id = faker.random.uuid()
      const response = await app.get(`/api/users/${id}`).set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(404)
      done()
    })

    // it('when no token is provided', async (done) => {
    //   const id = faker.random.uuid()
    //   const response = await app.get(`/api/users/${id}`)

    //   expect(response.status).toEqual(401)
    //   done()
    // })
  })
})
