import { app } from '../../setup'
import { getToken } from '../../support/getToken'

describe('API -> POST /api/token/verify', () => {
  describe('#tokenVerify', () => {
    it('when token is ok', async (done) => {
      const token = await getToken()
      const data = {
        token: token,
      }

      const response = await app.post('/api/token/verify').send(data)

      expect(response.status).toEqual(200)
      expect(response.body).toBeTruthy()

      done()
    })

    it('when token is invalid', async (done) => {
      const data = {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5ZTNlOWFiLWFjZTgtNDExMi04ZTJkLWMyNTA1MTY0OWM4MCIsIm5hbWUiOiJMZWFuZHJvIEJldmlsYXF1YSIsImVtYWlsIjoibGUuYmV2aWxhcXVhQGdtYWlsLmNvbSIsImlhdCI6MTU4OTQ4NTYwMCwiZXhwIjoxNTg5NDg5MjAwfQ.SkTf4UjBqIRvWcTOxxoFj94G4841xg524_IhYAoXfmM',
      }

      const response = await app.post('/api/token/verify').send(data)

      expect(response.status).toEqual(200)
      expect(response.body).toBeFalsy()

      done()
    })
  })
})
