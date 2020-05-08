import { app } from '../../setup'
import { stockFactory } from '../../support/factory/stock.factory'
import { userStockFactory } from '../../support/factory/user.stock.factory'
import { getToken } from '../../support/getToken'

describe('API -> DELETE /api/users/stock', () => {
    describe('#destroyUserStock', () => {
        it('when delete user stock and return status 204', async (done) => {
            const fakeUserId = '9c264140-d9d2-4x62-abaf-b7g0b17790d1'
            const token = await getToken(fakeUserId)

            const stock = await stockFactory({})

            await userStockFactory({ userId: fakeUserId, symbol: stock.symbol })

            const response = await app.delete(`/api/users/stock/${stock.symbol}`).set('Authorization', `Bearer  ${token}`)

            expect(response.status).toEqual(204)
            done()
        })

        it('when delete user stock that not exists and return status 404', async (done) => {
            const fakeUserId = 'cc262140-d9d2-4x62-abaf-b4g0b17750d1'
            const token = await getToken(fakeUserId)

            const response = await app.delete('/api/users/stock/FAKESTOCK').set('Authorization', `Bearer  ${token}`)

            expect(response.status).toEqual(404)
            done()
        })

        it('when no token is provided', async (done) => {
            const response = await app.delete('/api/users/stock/AAPL')

            expect(response.status).toEqual(401)
            done()
        })
    })
})
