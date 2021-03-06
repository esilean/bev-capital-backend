import { app } from '../../setup'
import { userFactory } from '../../support/factory/user.factory'
import faker from 'faker'
import { getToken } from '../../support/getToken'

describe('API -> POST /api/users', () => {
  describe('#createUser', () => {
    let token = ''
    let email = ''
    beforeEach(async () => {
      token = await getToken()

      const user = await userFactory({})
      email = user.email
    })

    it('when creating user is ok', async (done) => {
      const data = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      const response = await app.post('/api/users').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(201)
      expect(response.body).toHaveProperty('id')

      done()
    })

    it('when user data is missing', async (done) => {
      const data = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
      }

      const response = await app.post('/api/users').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(400)
      done()
    })

    it('when user email already exists', async (done) => {
      const data = {
        name: faker.name.firstName(),
        email: email,
      }

      const response = await app.post('/api/users').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(400)
      done()
    })

    it('when no token is provided', async (done) => {
      const data = {
        name: faker.name.firstName(),
        email: email,
      }

      const response = await app.post('/api/users').send(data)

      expect(response.status).toEqual(401)
      done()
    })
  })
})
