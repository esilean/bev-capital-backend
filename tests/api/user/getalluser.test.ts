import { app, jwt } from '../../setup'
import { userFactory } from '../../support/factory/user.factory'

describe('API -> GET /api/users', () => {
    describe('#getAllUsers', () => {
        let token = ''
        beforeEach(async () => {
            const user = await userFactory({})
            token = jwt.signin({
                id: user.id,
                name: user.name,
                email: user.email,
            })
        })

        it('when there are users', async (done) => {
            const response = await app.get('/api/users').set('Authorization', `Bearer  ${token}`)

            expect(response.status).toEqual(200)
            expect(response.body).toHaveLength(1)
            done()
        })

        it('when no token is provided', async (done) => {
            const response = await app.get('/api/users')

            expect(response.status).toEqual(401)
            done()
        })
    })
})
