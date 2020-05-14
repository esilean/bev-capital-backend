import { app } from '../../setup'
import { userFactory } from '../../support/factory/user.factory'
import UserLogin from '../../../src/d-domain/entities/user-login'

describe('API -> POST /api/token', () => {
  describe('#getToken', () => {
    let email = ''
    let password = ''
    beforeEach(async () => {
      const user = await userFactory({ password: 'secretpassword' })
      email = user.email
      password = 'secretpassword'
    })

    it('when user login is ok', async (done) => {
      const data: UserLogin = {
        email,
        password,
      }

      const response = await app.post('/api/token').send(data)

      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('token')

      done()
    })

    it('when user password is wrong', async (done) => {
      const data: UserLogin = {
        email,
        password: 'anothersecret',
      }

      const response = await app.post('/api/token').send(data)

      expect(response.status).toEqual(404)
      done()
    })
  })
})
