import { UserDomainInterface } from '../../../d-domain/interfaces/user.domain.interface'
import { GetUserServiceInterface } from '../../interfaces/user.service.interface'
import User from '../../../d-domain/entities/user'
import { optUserAndStocks } from './options'

export default class GetUserService implements GetUserServiceInterface {
  private readonly userDomain: UserDomainInterface

  constructor(userDomain: UserDomainInterface) {
    this.userDomain = userDomain
  }

  async execute(id: string): Promise<User> {
    const userFound = await this.userDomain.getById(id, optUserAndStocks)

    return userFound
  }
}
