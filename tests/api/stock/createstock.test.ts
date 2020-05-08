import { app, jwt } from '../../setup'
import { userFactory } from '../../support/factory/user.factory'
import { stockFactory } from '../../support/factory/stock.factory'
import faker from 'faker'

describe('API -> POST /api/stocks', () => {
    describe('#createStock', () => {
        let token = ''
        let symbol = ''
        beforeEach(async () => {
            const user = await userFactory({})
            token = jwt.signin({
                id: user.id,
                name: user.name,
                email: user.email,
            })

            const stock = await stockFactory({})
            symbol = stock.symbol
        })

        it('when creating stock is ok', async (done) => {
            const data = {
                symbol: faker.lorem.word(),
                name: faker.lorem.word(),
                exchange: faker.lorem.word(),
                website: faker.internet.url(),
            }

            const response = await app
                .post('/api/stocks')
                .set('Authorization', `Bearer  ${token}`)
                .send(data)

            expect(response.status).toEqual(201)
            expect(response.body).toHaveProperty('symbol')
            done()
        })

        it('when stock data is missing', async (done) => {
            const data = {
                exchange: faker.lorem.word(),
                website: faker.internet.url()
            }

            const response = await app
                .post('/api/stocks')
                .set('Authorization', `Bearer  ${token}`)
                .send(data)

            expect(response.status).toEqual(400)
            done()
        })

        it('when symbol already exists', async (done) => {
            const data = {
                symbol: symbol,
                name: faker.lorem.word(),
                exchange: faker.lorem.word(),
                website: faker.internet.url(),
            }

            const response = await app
                .post('/api/stocks')
                .set('Authorization', `Bearer  ${token}`)
                .send(data)

            expect(response.status).toEqual(400)
            done()
        })

        it('when no token is provided', async (done) => {
            const data = {
                symbol: symbol,
                name: faker.lorem.word(),
                exchange: faker.lorem.word(),
                website: faker.internet.url(),
            }

            const response = await app.post('/api/stocks').send(data)

            expect(response.status).toEqual(401)
            done()
        })
    })
})
