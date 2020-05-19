import { CreateUserServiceInterface } from '../../interfaces/user.service.interface'
import User from '../../../d-domain/entities/user'
import { UserDomainInterface } from '../../../d-domain/interfaces/user.domain.interface'

export default class CreateUserService implements CreateUserServiceInterface {
  private readonly userDomain: UserDomainInterface

  constructor(userDomain: UserDomainInterface) {
    this.userDomain = userDomain
  }

  async execute(body: User): Promise<User> {
    const { name, email, password } = body
    const newUser = new User('', name, email, password)

    const user = await this.userDomain.create(newUser)
    return user
  }
}
