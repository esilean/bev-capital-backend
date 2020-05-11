import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import { userStockFactory } from '../../support/factory/user.stock.factory'
import faker from 'faker'
import { getToken } from '../../support/getToken'

describe('API -> POST /api/usersstock', () => {
  describe('#createUserStock', () => {
    it('when creating user stock is ok', async (done) => {
      const stock = await stockFactory({})

      const data = {
        symbol: stock.symbol,
        qty: faker.finance.amount(),
        avgPrice: faker.finance.amount(),
      }

      const token = await getToken()
      const response = await app.post('/api/usersstock').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(201)
      expect(response.body).toHaveProperty('id')
      done()
    })

    it('when user stock data is missing', async (done) => {
      const data = {
        qty: faker.finance.amount(),
        avgPrice: faker.finance.amount(),
      }

      const token = await getToken()
      const response = await app.post('/api/usersstock').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(400)
      done()
    })

    it('when stock does not exist', async (done) => {
      const data = {
        symbol: 'FAKESYMBOL',
        qty: faker.finance.amount(),
        avgPrice: faker.finance.amount(),
      }

      const token = await getToken()
      const response = await app.post('/api/usersstock').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(404)
      done()
    })

    it('when stock already added to user', async (done) => {
      const fakeUserId = faker.random.uuid()
      const fakeSymbol = 'FAKEADDSYMBOLXXXX'
      const token = await getToken(fakeUserId)

      await stockFactory({ symbol: fakeSymbol })
      await userStockFactory({ userId: fakeUserId, symbol: fakeSymbol })

      const data = {
        symbol: fakeSymbol,
        qty: faker.finance.amount(),
        avgPrice: faker.finance.amount(),
      }

      const response = await app.post('/api/usersstock').set('Authorization', `Bearer  ${token}`).send(data)

      expect(response.status).toEqual(400)
      done()
    })

    it('when no token is provided', async (done) => {
      const data = {
        symbol: faker.lorem.word(),
        qty: faker.finance.amount(),
        avgPrice: faker.finance.amount(),
      }

      const response = await app.post('/api/usersstock').send(data)

      expect(response.status).toEqual(401)
      done()
    })
  })
})
