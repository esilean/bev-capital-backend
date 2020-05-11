import container, { db } from '../../setup'
import { userFactory } from '../../support/factory/user.factory'
import { UserRepositoryInterface } from '../../../src/e-infra/data/interfaces/user.repository.interface'

describe('Infra -> Data -> Repositories -> User', () => {
  let userRepo: UserRepositoryInterface
  beforeAll(() => {
    userRepo = container.resolve<UserRepositoryInterface>('userRepository')
  })

  afterAll(async () => {
    await db.close()
  })

  describe('#destroyUser', () => {
    it('when there is user', async (done) => {
      const user = await userFactory({})

      const userDestroyed = await userRepo.destroy(user.id)

      expect(userDestroyed).toBeTruthy()

      done()
    })

    it('when there is no user', async (done) => {
      const userDestroyed = await userRepo.destroy('123')
      expect(userDestroyed).toBeFalsy()
      done()
    })
  })
})
