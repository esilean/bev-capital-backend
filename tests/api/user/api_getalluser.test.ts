import { app } from '../../setup'
import { getToken } from '../../support/getToken'

describe('API -> GET /api/users', () => {
  describe('#getAllUsers', () => {
    let token = ''
    beforeEach(async () => {
      token = await getToken()
    })

    it('when there are users', async (done) => {
      const response = await app.get('/api/users').set('Authorization', `Bearer  ${token}`)

      expect(response.status).toEqual(200)
      expect(response.body.length).toBeGreaterThan(0)

      done()
    })

    it('when no token is provided', async (done) => {
      const response = await app.get('/api/users')

      expect(response.status).toEqual(401)
      done()
    })
  })
})
