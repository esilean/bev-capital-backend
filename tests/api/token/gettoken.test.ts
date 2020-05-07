import { app } from '../../setup'
import { userFactory } from '../../support/factory/userFactory'
import Token from '../../../src/d-domain/entities/Token'

describe('API -> POST /api/token', () => {
    describe('#createUser', () => {
        let email = ''
        let password = ''
        beforeEach(async () => {
            const user = await userFactory({ password: 'secretpassword' })
            email = user.email
            password = 'secretpassword'
        })

        it('when user login is ok', async (done) => {
            const data: Token = {
                email,
                password,
            }

            const response = await app.post('/api/token').send(data)

            expect(response.status).toEqual(200)
            expect(response.body).toHaveProperty('token')
            done()
        })

        it('when user password is wrong', async (done) => {
            const data: Token = {
                email,
                password: 'anothersecret',
            }

            const response = await app.post('/api/token').send(data)

            expect(response.status).toEqual(404)
            done()
        })
    })
})
