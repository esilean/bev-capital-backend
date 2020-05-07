import container, { db } from '../../setup'
import { userFactory } from '../../support/factory/userFactory'
import { UserRepositoryInterface } from '../../../src/e-infra/data/interfaces/UserRepositoryInterface'
import User from '../../../src/d-domain/entities/User'

describe('Infra -> Data -> Repositories -> User', () => {
    let userRepo: UserRepositoryInterface
    beforeAll(() => {
        userRepo = container.resolve<UserRepositoryInterface>('userRepository')
    })

    afterAll(async () => {
        await db.close()
    })

    describe('#getAllUsers', () => {
        beforeEach(async () => {
            await userFactory({})
            await userFactory({})
        })

        it('when there are users', async (done) => {
            const users = await userRepo.getAll()

            expect(users).toHaveLength(2)
            expect(users[0]).toBeInstanceOf(User)

            done()
        })
    })
})
