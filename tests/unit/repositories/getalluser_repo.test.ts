import container from '../../setup'
import { userFactory } from '../../support/factory/user.factory'
import { UserRepositoryInterface } from '../../../src/e-infra/data/interfaces/user.repository.interface'
import User from '../../../src/d-domain/entities/user'

describe('Infra -> Data -> Repositories -> User', () => {
  let userRepo: UserRepositoryInterface
  beforeAll(() => {
    userRepo = container.resolve<UserRepositoryInterface>('userRepository')
  })

  describe('#getAllUsers', () => {
    beforeEach(async () => {
      await userFactory({})
      await userFactory({})
    })

    it('when there are users', async (done) => {
      const users = await userRepo.getAll()

      expect(users.length).toBeGreaterThan(0)
      expect(users[0]).toBeInstanceOf(User)

      done()
    })
  })
})
