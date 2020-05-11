import container, { db } from '../../setup'
import faker from 'faker'
import { UserRepositoryInterface } from '../../../src/e-infra/data/interfaces/user.repository.interface'
import User from '../../../src/d-domain/entities/user'
import { toDB } from '../../../src/e-infra/data/repositories/mappers/user.mapper'
import { validate } from 'class-validator'

describe('Infra -> Data -> Repositories -> User', () => {
  let userRepo: UserRepositoryInterface
  beforeAll(() => {
    userRepo = container.resolve<UserRepositoryInterface>('userRepository')
  })

  afterAll(async () => {
    await db.close()
  })

  describe('#createUser', () => {
    it('when user is valid', async (done) => {
      const newUser = new User('', faker.name.firstName(), faker.internet.email(), faker.internet.password())

      validate(newUser).then(async () => {
        const userCreated = await userRepo.create(toDB(newUser))

        expect(userCreated).toBeInstanceOf(User)
        expect(userCreated).toHaveProperty('id')
        done()
      })
    })
  })
})
